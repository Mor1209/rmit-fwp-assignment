'use strict'

import express from 'express'
import userController from '../controllers/userController.js'
import authController from '../controllers/authController.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

router
  .route('/')
  .get(authController.protectedRoute, userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

export default router
