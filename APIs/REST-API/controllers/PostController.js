'use strict'

import db from '../models/index.cjs'

const getPostById = async (req, res) => {
  const postId = req.params.id

  try {
    const post = await db.Post.findByPk(postId)
    res.status(200).json({ post: post })
  } catch (error) {
    res.status(404).json({ message: 'post not found' })
  }
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
  const data = req.body.post
  try {
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
    res.status(204)
  } catch (error) {
    res.status(400)
  }
}

export default { getAllPosts, getPostById, createPost, deletePost, updatePost }
