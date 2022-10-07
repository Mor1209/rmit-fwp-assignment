'use strict'

import express from 'express'
import commentController from '../controllers/commentController.js'
import authController from '../controllers/authController.js'

const router = express.Router()
// define api routes here

router
  .route('/')
  .post(authController.protectedRoute, commentController.createComment)
router
  .route('/:id')
  .get(authController.protectedRoute, commentController.getComments)
export default router
