import { createPost } from '../../data/posts'
import { getUser } from '../../data/users'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import PostForm from '../../components/Forms/PostForm'

function CreatePost() {
  const { sendNotification } = useNotificationContext()

  const [isLoading, setLoading] = useState(false)
  const author = getUser()
  const navigate = useNavigate()

  const onSubmit = async data => {
    // save the inputed data
    setLoading(true)
    const url = await imageUpload(data.image[0])

    if (url === 'error') {
      sendNotification('error', 'Failed to Upload Image', false)
      return
    }

    const post = {
      ...data,
      image: url,
      author: author.name,
      userId: author.userId,
    }

    createPost(post)
    setLoading(false)
    sendNotification('success', 'Post created', false)
    navigate('/posts')
  }

  return (
    <PostForm
      onSubmit={onSubmit}
      loading={isLoading}
      formName="Create a Post"
    />
  )
}

export default CreatePost
