'use strict'

import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import { Op } from 'sequelize'
import * as qrcode from 'qrcode'
import speakeasy from 'speakeasy'
import db from '../models/index.cjs'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import { registerSchema, loginSchema } from '../utils/userValidation.js'

const signJwt = userId =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const createTokenResponse = (user, res, statusCode) => {
  const token = signJwt(user.id)

  const cookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_EXPIRES_IN),
    sameSite: 'Strict',
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined
  user.mfaSecret = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

const register = catchAsync(async (req, res, next) => {
  // filter req.body to eliminate attacks with more fields than allowed ones
  const filteredReq = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key]) =>
        key === 'username' ||
        key === 'email' ||
        key === 'password' ||
        key === 'mfaSecret' ||
        key === 'token'
    )
  )

  if (!(await registerSchema.isValid(filteredReq)))
    return next(new AppError('User details not valid!', 400))

  const verified = speakeasy.totp.verify({
    secret: filteredReq.mfaSecret.secret,
    encoding: 'ascii',
    token: filteredReq.token,
  })

  if (!verified) return next(new AppError('Token not correct !', 400))

  const hash = await argon2.hash(filteredReq.password, {
    type: argon2.argon2id,
  })

  const user = await db.User.create({
    username: filteredReq.username,
    password: hash,
    email: filteredReq.email.toLowerCase(),
    mfaSecret: filteredReq.mfaSecret.secret,
  })

  createTokenResponse(user, res, 201)
})

// validates user Credentials and checks if user with credentials already exists
const registerMfa = catchAsync(async (req, res, next) => {
  // filter req.body to eliminate attacks with more fields than allowed ones
  const filteredReq = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key]) => key === 'username' || key === 'email' || key === 'password'
    )
  )

  if (!(await registerSchema.isValid(filteredReq)))
    return next(new AppError('User details not valid!', 400))

  const exists = await db.User.findOne({
    where: {
      [Op.or]: [
        { username: filteredReq.username },
        { email: filteredReq.email.toLowerCase() },
      ],
    },
  })

  if (exists && exists.email === filteredReq.email) {
    return next(new AppError('User with email already exists !', 400))
  }

  if (exists && exists.username === filteredReq.username) {
    return next(new AppError('User with username already exists !', 400))
  }

  // generating secret with speakeasy
  const { ascii: secret, otpauth_url: otpauthUrl } = speakeasy.generateSecret({
    name: 'LoopAgileNow',
  })

  // translating mfa register link to qr code
  // to be used in authenticator app to get token for user
  const qrCode = await qrcode.toDataURL(otpauthUrl)

  res.status(200).json({
    status: 'success',
    data: {
      qrCode,
      mfaSecret: {
        secret,
        otpauthUrl,
      },
    },
  })
})

const login = catchAsync(async (req, res, next) => {
  // filter req.body to eliminate attacks with more fields than allowed ones
  const { email, password, token } = req.body

  if (!(await loginSchema.isValid({ email, password })))
    return next(new AppError('User details not valid!', 400))

  const user = await db.User.scope('withPassword').findOne({ where: { email } })

  if (!user || !(await argon2.verify(user.password, password)))
    return next(new AppError('Incorrect email or password', 401))

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'ascii',
    token: token,
  })

  if (!verified) return next(new AppError('Incorrect token', 400))

  createTokenResponse(user, res, 200)
})

const validateUser = catchAsync(async (req, res, next) => {
  // filter req.body to eliminate attacks with more fields than allowed ones
  const { email, password } = req.body

  if (!(await loginSchema.isValid({ email, password })))
    return next(new AppError('User details not valid!', 400))

  const user = await db.User.scope('withPassword').findOne({ where: { email } })

  if (!user || !(await argon2.verify(user.password, password)))
    return next(new AppError('Incorrect email or password', 401))

  res.status(200).json({
    status: 'success',
    data: null,
  })
})

const protectedRoute = catchAsync(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next(new AppError('Please login to access!'), 401)
  }

  // verify token is valid and not expired
  const jwtIsValid = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // verify that user still exists
  const user = await db.User.findByPk(jwtIsValid.userId)

  if (!user) return next(new AppError(`User doesnt't exist anymore`, 401))

  req.user = user
  next()
})

export default { register, registerMfa, login, validateUser, protectedRoute }
