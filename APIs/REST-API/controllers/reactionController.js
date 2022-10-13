import db from '../models/index.cjs'

const getReaction = async (req, res) => {
  try {
    const { postId, userId } = req.query
    const reaction = await db.Reaction.findOne({
      where: { userId: userId, postId: postId },
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

    res.status(201).json({ reaction: reaction })
  } catch (error) {
    res.status(409).json({ message: 'failed to update reaction' })
  }
}

const updateReaction = async (req, res) => {
  try {
    const data = req.body.reaction

    await db.Reaction.update(data, {
      where: { postId: data.postId, userId: data.userId },
    })

    res.status(200).json({ reaction: data })
  } catch (error) {
    res.status(409).json({ message: 'failed to update reaction' })
  }
}

export default { getReaction, updateReaction, createReaction }
