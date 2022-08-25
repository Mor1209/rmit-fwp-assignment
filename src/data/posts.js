const initPosts = () => {
  if (localStorage.getItem('posts') !== null) return

  localStorage.setItem('posts', JSON.stringify([]))
  localStorage.setItem('comments', JSON.stringify([]))
}

const getAllPosts = () => {
  return JSON.parse(localStorage.getItem('posts'))
}

const getPostById = id => {
  const posts = getAllPosts()
  const post = posts.find(post => post.id === parseInt(id))
  let comments = JSON.parse(localStorage.getItem('comments'))

  if (comments === null) {
    comments = []
  } else {
    comments = comments.filter(comment => comment.postId === parseInt(id))
  }

  return { post, comments }
}

const createPost = post => {
  let posts = getAllPosts()
  if (posts !== null && posts.length > 0) {
    const lastPost = posts.at(-1)
    post['id'] = lastPost.id + 1
  } else {
    post['id'] = 1
  }
  posts.push(post)
  localStorage.setItem('posts', JSON.stringify(posts))
}

const createComment = (comment, postId, parentId) => {
  let comments = JSON.parse(localStorage.getItem('comments'))
  if (comments === null) comments = []

  comment['parentId'] = parentId
  comment['postId'] = postId

  if (comments.length > 0) {
    const lastComment = comments.at(-1)
    comment['id'] = lastComment.id + 1
  } else {
    comment['id'] = 1
  }
  comments.push(comment)
  localStorage.setItem('comments', JSON.stringify(comments))
  return comment
}

const deletePost = id => {
  let posts = JSON.parse(localStorage.getItem('posts'))
  if (posts === null) return false

  posts = posts.filter(post => post.id !== id)

  const comments = JSON.parse(localStorage.getItem('comments')).filter(
    comment => comment.postId !== id
  )

  console.log(comments)
  localStorage.setItem('posts', JSON.stringify(posts))
  localStorage.setItem('comments', JSON.stringify(comments))
  return posts
}

export {
  initPosts,
  getAllPosts,
  createPost,
  getPostById,
  createComment,
  deletePost,
}
