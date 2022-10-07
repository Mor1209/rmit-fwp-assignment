'use strict'

import express from 'express'
import postController from '../controllers/PostController.js'
import authController from '../controllers/authController.js'

const router = express.Router()
// define api routes here
router
  .route('/:id')
  .get(authController.protectedRoute, postController.getPostById)
  .delete(authController.protectedRoute, postController.deletePost)
  .patch(authController.protectedRoute, postController.updatePost)
router
  .route('/')
  .get(authController.protectedRoute, postController.getAllPosts)
  .post(authController.protectedRoute, postController.createPost)

export default router
