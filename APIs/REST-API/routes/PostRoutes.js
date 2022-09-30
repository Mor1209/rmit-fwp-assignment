'use strict'

import express from 'express'
import postController from '../controllers/PostController.js'

const router = express.Router()
// define api routes here
router.get('/:id', postController.getPostById)

router.get('/', postController.getAllPosts)

router.post('/posts', postController.createPost)

router.delete('/:id', postController.deletePost)

export default router
