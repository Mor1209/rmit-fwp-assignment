'use strict'

import db from '../models/index.cjs'

const getPostById = async (req, res) => {
  const postId = req.params.id

  try {
    const posts = await db.Post.findByPk(postId)
    res.status(200).json({ post: posts })
  } catch (error) {
    res.status(404).json({ message: 'post not found' })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll()
    console.log(posts)
    res.status(200).json({ posts: posts })
  } catch (error) {
    res.status(404)
  }
}

const createPost = async (req, res) => {
  const data = req.body.post
  try {
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
    res.status(204).json({ message: 'post deleted' })
  } catch (error) {
    res.status(404)
  }
}

const updatePost = async (req, res) => {
  const postId = req.params.id
  const data = req.body.post
  try {
    await db.Post.update(data, {
      where: { id: postId },
    })
    res.status(204).json({ message: 'updated post' })
  } catch (error) {
    res.status(400)
  }
}

export default { getAllPosts, getPostById, createPost, deletePost, updatePost }
