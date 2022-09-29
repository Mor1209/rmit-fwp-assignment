'use strict'

import argon2 from 'argon2'
import db from '../models/index.cjs'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import { registerSchema } from '../utils/userValidation.js'

const getAllUsers = catchAsync(async (req, res) => {
  const users = await db.User.findAll()

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  })
})

const createUser = catchAsync(async (req, res, next) => {
  if (!(await registerSchema.isValid(req.body)))
    return next(new AppError('User details not valid!', 400))

  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id })

  const user = await db.User.create({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email,
  })

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const getUser = catchAsync(async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const updateUser = catchAsync(async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

export default { getAllUsers, createUser, getUser, updateUser, deleteUser }
