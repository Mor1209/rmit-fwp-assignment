import { getUser } from '../../data/users'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import PostForm from '../../components/Forms/PostForm'
import { useMutation } from 'react-query'

function CreatePost() {
  const { sendNotification } = useNotificationContext()
  const API_PATH = 'http://localhost:4000/api'
  const [isLoading, setLoading] = useState(false)
  const author = getUser()
  const navigate = useNavigate()

  const createPost = async data => {
    await fetch(`${API_PATH}/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: data }),
    })
  }

  const { mutate } = useMutation(createPost, {
    onSuccess: data => {
      console.log(data)
      setLoading(false)
      sendNotification('success', 'Post created', false)
      navigate('/posts')
    },
    onError: () => {
      setLoading(false)
      sendNotification('error', 'failed to create post', false)
    },
  })

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
      userId: 'test',
    }

    mutate(post)
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
