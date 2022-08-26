import { Container } from '@mui/material'

import { editPost, getPostById } from '../../data/posts'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import EditPostForm from '../../components/Forms/EditPostForm'
import { useParams } from 'react-router'

function EditPost() {
  const params = useParams()

  const { sendNotification } = useNotificationContext()
  const [oldPost, setOldPost] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // get old post data
    const { post } = getPostById(params.id)
    setOldPost(post)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async data => {
    setLoading(true)

    const url = await imageUpload(data.image[0])

    if (url === 'error') {
      sendNotification('error', 'Failed to Upload Image', false)
      return
    }

    const post = {
      ...data,
      id: oldPost.id,
      image: url,
    }

    editPost(post)
    setLoading(false)
    sendNotification('success', 'Post Updated', false)
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
      <h1> Edit a Post </h1>
      <EditPostForm loading={isLoading} onSubmit={onSubmit} oldData={oldPost} />
    </Container>
  )
}

export default EditPost
