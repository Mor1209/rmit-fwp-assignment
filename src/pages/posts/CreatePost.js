import { Container } from '@mui/material'
import { createPost } from '../../data/posts'
import { getUser } from '../../data/users'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import CreatePostForm from '../../components/Forms/CreatePostForm'

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
    <Container
      sx={{
        height: '100%',
        backgroundColor: 'white',
        border: '2px',
        borderRadius: '25px',
        padding: '10px',
        width: '50%',
      }}
    >
      <h1> Create a Post </h1>
      <CreatePostForm onSubmit={onSubmit} loading={isLoading} />
    </Container>
  )
}

export default CreatePost
