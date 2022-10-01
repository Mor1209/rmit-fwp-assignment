'use strict'

import db from '../models/index.cjs'

const createComment = async (req, res) => {
  const data = req.body.comment

  try {
    await db.Comment.create(data)
    res.status(200).json({ message: 'comment created' })
  } catch (error) {
    res.status(404).json({ message: 'comment not found' })
  }
}

const getComment = async (req, res) => {
  const commentId = req.params.id

  const comment = await db.Comment.findByPk(commentId)
  res.status(200).json({ comment: comment })
}
export default { createComment, getComment }
