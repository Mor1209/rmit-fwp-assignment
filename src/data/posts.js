const initPosts = () => {
  if (localStorage.getItem('posts') !== null) return

  localStorage.setItem('posts', JSON.stringify([]))
}

const allPosts = () => {
  return JSON.parse(localStorage.getItem('posts'))
}

const getPostById = id => {
  const posts = allPosts()
  // posts.inlcude

  return posts.find(post => post.id === parseInt(id))
}

const createPost = post => {
  let posts = allPosts()
  if (posts.length > 0) {
    const lastPost = posts.at(-1)
    post['id'] = lastPost.id += 1
  } else {
    post['id'] = 1
  }
  posts.push(post)
  localStorage.setItem('posts', JSON.stringify(posts))
}
export { initPosts, allPosts, createPost, getPostById }
