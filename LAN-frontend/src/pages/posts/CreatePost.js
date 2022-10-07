import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
// import { imageUpload } from '../../firebase'
import PostForm from '../../components/Forms/PostForm'
import { useMutation } from 'react-query'
import { createPost } from '../../data/api'
import { useAuthContext } from '../../hooks/useAuthContext'

function CreatePost() {
  const { sendNotification } = useNotificationContext()
  let { user } = useAuthContext()

  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

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
