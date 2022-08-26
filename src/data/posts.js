import { imageUpload } from '../firebase'

const POSTS_KEY = 'posts'
const COMMENTS_KEY = 'comments'

const initPosts = () => {
  if (
    localStorage.getItem(POSTS_KEY) !== null &&
    localStorage.getItem(COMMENTS_KEY) !== null
  )
    return

  localStorage.setItem(POSTS_KEY, JSON.stringify([]))
  localStorage.setItem(COMMENTS_KEY, JSON.stringify([]))
}

const getAllPosts = () => {
  return JSON.parse(localStorage.getItem(POSTS_KEY))
}

const getAllComments = () => {
  return JSON.parse(localStorage.getItem(COMMENTS_KEY))
}

const getPostById = id => {
  const post = getAllPosts().find(post => post.id === parseInt(id))
  const comments = getAllComments().filter(
    comment => comment.postId === parseInt(id)
  )

  return { post, comments }
}

const generateId = array => {
  return array.length > 0 ? array.at(-1).id + 1 : 0
}

const createPost = post => {
  let posts = getAllPosts()
  const id = generateId(posts)
  post['id'] = id
  posts.push(post)
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

const editPost = newPost => {
  // update old post data with new post
  let posts = getAllPosts()
  const i = posts.findIndex(post => post.id === parseInt(newPost.id))
  posts[i] = newPost
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}

const createComment = async (comment, postId, parentId) => {
  let comments = JSON.parse(localStorage.getItem(COMMENTS_KEY))
  const id = generateId(comments)

  const url = await imageUpload(comment.image[0])
  comment['id'] = id
  comment['parentId'] = parentId
  comment['postId'] = postId
  comment['image'] = url

  comments.push(comment)
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  return comment
}

const deletePost = id => {
  // delete post data and relevant comments

  let posts = JSON.parse(localStorage.getItem(POSTS_KEY))
  console.log(posts)
  if (posts === null) return false

  posts = posts.filter(post => post.id !== parseInt(id))

  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY)).filter(
    comment => comment.postId !== id
  )

  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  return posts
}

export {
  initPosts,
  getAllPosts,
  createPost,
  getPostById,
  createComment,
  deletePost,
  editPost,
}
