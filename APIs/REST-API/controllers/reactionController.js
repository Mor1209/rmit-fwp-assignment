import db from '../models/index.cjs'

const getReaction = async (req, res) => {
  try {
    const { postId, userId, commentId } = req.query
    const cId = commentId === undefined ? null : commentId

    const reaction = await db.Reaction.findOne({
      where: { userId: userId, postId: postId, commentId: cId },
    })

    res.status(200).json({ reaction: reaction })
  } catch (error) {
    res.status(424).json({ message: 'failed to update post' })
  }
}

const createReaction = async (req, res) => {
  try {
    const data = req.body.reaction
    const reaction = await db.Reaction.create(data)
    console.log(reaction)
    res.status(201).json({ reaction: reaction })
  } catch (error) {
    res.status(409).json({ message: 'failed to update reaction' })
  }
}

const updateReaction = async (req, res) => {
  try {
    const data = req.body.reaction

    await db.Reaction.update(data, {
      where: {
        postId: data.postId,
        userId: data.userId,
        commentId: data.commentId,
      },
    })

    const reaction = await db.Reaction.findOne({
      where: {
        postId: data.postId,
        userId: data.userId,
        commentId: data.commentId,
      },
    })
    res.status(200).json({ reaction: reaction })
  } catch (error) {
    res.status(409).json({ message: 'failed to update reaction' })
  }
}

export default { getReaction, updateReaction, createReaction }
