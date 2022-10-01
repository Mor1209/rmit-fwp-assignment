'use strict'

import express from 'express'
import postController from '../controllers/PostController.js'

const router = express.Router()
// define api routes here
router
  .route('/:id')
  .get(postController.getPostById)
  .delete(postController.deletePost)
  .patch(postController.updatePost)
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost)

export default router
