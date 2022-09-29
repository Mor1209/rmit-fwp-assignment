'use strict'

import express from 'express'
import userController from '../controllers/userController.js'
// import authController from '../controllers/authController'

const router = express.Router()

// router.post('/register', authController.register)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

export default router
