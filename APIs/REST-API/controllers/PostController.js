'use strict'

import db from '../models/index.cjs'

const getPostById = async (req, res) => {
  const postId = req.params.id

  // try {
  const post = await db.Post.findByPk(postId, {
    include: db.Reaction,
  })
  res.status(200).json({ post: post })
  // } catch (error) {
  //   res.status(404).json({ message: 'post not found' })
  // }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll()
    res.status(200).json({ posts: posts })
  } catch (error) {
    res.status(404)
  }
}

const createPost = async (req, res) => {
  try {
    const data = req.body.post
    // not sure why the text automatically appended some characters when sending the data
    // need to replace the characters to <
    const content = data.content.replace(/&lt;/g, '<')
    data.content = content
    await db.Post.create(data)
    res.status(201).json({ message: 'post created' })
  } catch (error) {
    res.status(424).json({ message: 'failed to create post' })
  }
}

const deletePost = async (req, res) => {
  const postId = req.params.id
  try {
    await db.Post.destroy({ where: { id: postId } })
    const posts = await db.Post.findAll()
    res.status(200).json({ message: 'post deleted', posts: posts })
  } catch (error) {
    res.status(424).json({ message: 'failed to delete post' })
  }
}

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id
    const data = req.body.post
    if (data.content !== undefined) {
      const content = data?.content.replace(/&lt;/g, '<')
      data.content = content
    }

    await db.Post.update(data, {
      where: { id: postId },
    })
    const post = await db.Post.findByPk(data.id)
    res.status(201).json({ post: post })
  } catch (error) {
    res.status(424).json({ message: 'failed to update post' })
  }
}

const updateReaction = async (req, res) => {
  try {
    const postId = req.params.id
    const data = req.body.reaction

    await db.Reaction.update(data, {
      where: { postId: postId },
    })
    const reaction = await db.Reaction.findAll({ where: { postId: postId } })
    res.status(200).json({ reaction: reaction })
  } catch (error) {
    res.status(409).json({ message: 'failed to update reaction' })
  }
}

export default {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  updateReaction,
}
