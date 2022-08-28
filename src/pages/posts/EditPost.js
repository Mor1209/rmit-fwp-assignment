import { editPost, getPostById } from '../../data/posts'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import PostForm from '../../components/Forms/PostForm'
import { useParams } from 'react-router'

function EditPost() {
  const params = useParams()

  const { sendNotification } = useNotificationContext()
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { post: oldPost } = getPostById(params.id)

  const onSubmit = async data => {
    setLoading(true)
    let image = oldPost.image

    if (data.image[0]) {
      image = await imageUpload(data.image[0])

      if (image === 'error') {
        sendNotification('error', 'Failed to Upload Image', false)
        return
      }
    }

    const post = {
      ...data,
      id: oldPost.id,
      author: oldPost.author,
      image,
    }

    editPost(post)
    setLoading(false)
    sendNotification('success', 'Post Updated', false)
    navigate('/posts')
  }

  return (
    <PostForm
      loading={isLoading}
      onSubmit={onSubmit}
      formName="Edit Post"
      defaultValue={oldPost}
    />
  )
}

export default EditPost
