'use strict'

import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import db from '../models/index.cjs'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import { registerSchema, loginSchema } from '../utils/userValidation.js'

const signJwt = userId =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const register = catchAsync(async (req, res, next) => {
  console.log('in register')
  // filter req.body to eliminate attacks with more fields than allowed ones
  const filteredReq = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key]) => key === 'username' || key === 'email' || key === 'password'
    )
  )

  console.log(filteredReq)
  if (!(await registerSchema.isValid(filteredReq)))
    return next(new AppError('User details not valid!', 400))

  const hash = await argon2.hash(filteredReq.password, {
    type: argon2.argon2id,
  })

  const user = await db.User.create({
    username: filteredReq.username,
    password: hash,
    email: filteredReq.email,
  })

  const token = signJwt(user.id)

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
})

const login = catchAsync(async (req, res, next) => {
  // filter req.body to eliminate attacks with more fields than allowed ones
  const { email, password } = req.body

  if (!(await loginSchema.isValid({ email, password })))
    return next(new AppError('User details not valid!', 400))

  const user = await db.User.scope('withPassword').findOne({ where: { email } })

  if (!user || !(await argon2.verify(user.password, password)))
    return next(new AppError('Incorrect email or password', 401))

  const token = signJwt(user.id)

  res.status(201).json({
    status: 'success',
    token,
  })
})

const protectedRoute = catchAsync(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
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

export default { register, login, protectedRoute }
