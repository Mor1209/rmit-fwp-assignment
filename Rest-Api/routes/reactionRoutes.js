'use strict'

import express from 'express'
import reactionController from '../controllers/reactionController.js'
import authController from '../controllers/authController.js'

const router = express.Router()
// define api routes here
router
  .route('/')
  .get(authController.protectedRoute, reactionController.getReaction)
  .post(authController.protectedRoute, reactionController.createReaction)
  .patch(authController.protectedRoute, reactionController.updateReaction)

export default router
