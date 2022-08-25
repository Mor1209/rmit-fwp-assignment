const initPosts = () => {
  if (localStorage.getItem('posts') !== null) return

  localStorage.setItem('posts', JSON.stringify([]))
  localStorage.setItem('comments', JSON.stringify([]))
}

const allPosts = () => {
  return JSON.parse(localStorage.getItem('posts'))
}

const getPostById = id => {
  const posts = allPosts()
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
  let posts = allPosts()
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

export { initPosts, allPosts, createPost, getPostById, createComment }
