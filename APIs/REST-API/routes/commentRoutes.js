'use strict'

import express from 'express'
import commentController from '../controllers/commentController.js'

const router = express.Router()
// define api routes here

router.route('/').post(commentController.createComment)
router.route('/:id').get(commentController.getComment)
export default router
