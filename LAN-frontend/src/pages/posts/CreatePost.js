import { getUser } from '../../data/users'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import PostForm from '../../components/Forms/PostForm'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

function CreatePost() {
  const { sendNotification } = useNotificationContext()
  let { user } = useAuthContext()

  const API_PATH = 'http://localhost:4000/api'
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  const createPost = async post => {
    const { data } = await axios.post(
      API_PATH + '/posts',
      { post: post },
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )
    return data
  }

  const { mutate } = useMutation(createPost, {
    onSuccess: data => {
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
    setLoading(true)
    // const url = await imageUpload(data.image[0])

    // if (url === 'error') {
    //   sendNotification('error', 'Failed to Upload Image', false)
    //   return
    // }

    const post = {
      ...data,
      image: null,
      author: user.username,
      userId: user.id,
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
