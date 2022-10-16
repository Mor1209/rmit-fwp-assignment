import axios from 'axios'
const API_PATH = 'http://localhost:4000/api'

const API = axios.create({
  baseURL: API_PATH,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

const allPosts = {
  posts: [
    {
      id: 1,
      content: '<p>hello world my day</p>',
      userId: 1,
      title: 'hello world',
      author: 'ming',
      image: null,
    },
  ],
}

const singlePost = {
  post: {
    id: 1,
    content: '<p>reactjs is the best</p>',
    title: 'unit test',
    image: null,
    author: 'ming',
    userId: 1,
    UserId: 1,
    Reactions: [
      {
        id: 1,
        reaction: 'like',
        CommentId: null,
        PostId: 1,
        postId: 1,
        commentId: null,
        userId: 1,
        UserId: 1,
      },
    ],
  },
}
const reaction = {
  reaction: {
    id: 1,
    reaction: 'like',
    CommentId: null,
    PostId: 1,
    postId: 1,
    commentId: null,
    userId: 1,
    UserId: 1,
  },
}

const updateReactionData = {
  reaction: {
    id: 1,
    reaction: 'none',
    CommentId: null,
    PostId: 1,
    postId: 1,
    commentId: null,
    userId: 1,
    UserId: 1,
  },
}

const fetchAllPosts = async (test = false) => {
  if (test) {
    return allPosts.posts
  }

  const { data } = await API.get('/posts')
  return data.posts
}

const deletePost = async id => {
  const { data } = await API.delete(`/posts/${id}`)
  return data
}

const createComment = async comment => {
  const { data } = await API.post('/comments', { comment: comment })
  return data
}

const fetchPost = async (id, test) => {
  if (test) return singlePost.post
  const { data } = await API.get(`/posts/${id}`)
  return data.post
}

const fetchComments = async id => {
  const { data } = await API.get(`/comments/${id}`)
  return data.comments
}

const updatePost = async post => {
  const { data } = await API.patch(`/posts/${post.id}`, { post: post })
  return data
}

const createPost = async post => {
  const { data } = await API.post('/posts', { post: post })
  return data
}

const createReaction = async reaction => {
  const { data } = await API.post('/reactions', { reaction: reaction })
  return data
}

const updateReaction = async reaction => {
  if (reaction.test) return updateReactionData
  const { data } = await API.patch('/reactions', { reaction: reaction })
  return data
}

const getReaction = async (postId, userId, commentId, test = false) => {
  if (test) {
    return reaction.reaction
  }
  const { data } = await API.get('/reactions', {
    params: {
      userId: userId,
      postId: parseInt(postId),
      commentId: commentId,
    },
  })

  return data.reaction
}

export {
  fetchAllPosts,
  deletePost,
  createComment,
  fetchPost,
  fetchComments,
  updatePost,
  createPost,
  createReaction,
  updateReaction,
  getReaction,
}
