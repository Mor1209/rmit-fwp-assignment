'use strict'

import db from '../models/index.cjs'

const createComment = async (req, res) => {
  const data = req.body.comment

  try {
    const content = data.content.replace(/&lt;/g, '<')
    data.content = content
    const newComment = await db.Comment.create(data)

    res.status(201).json({ message: 'comment created', comment: newComment })
  } catch (error) {
    res.status(409).json({ message: 'failed to create comment' })
  }
}

const getComments = async (req, res) => {
  const commentId = req.params.id

  try {
    const comments = await db.Comment.findAll({ where: { postId: commentId } })
    res.status(200).json({ comments: comments })
  } catch (error) {
    res.status(409).json({ message: 'failed to create comment' })
  }
}
export default { createComment, getComments }
