'use strict'

const tempPosts = [{ postId: 1, content: 'test' }]

const getPostById = async (req, res) => {
  const postId = req.params.id
  res.status(200).json({ posts: { postId: postId } })
}

const getAllPosts = async (req, res) => {
  res.status(200).json({ posts: tempPosts })
}

const createPost = async (req, res) => {
  const newPost = req.body.post

  res.status(201).json({ posts: [...tempPosts, newPost] })
}

const deletePost = async (req, res) => {
  const newPost = req.body.post

  res.status(201).json({ posts: [...tempPosts, newPost] })
}

export default { getAllPosts, getPostById, createPost, deletePost }
