import { editPost, getPostById } from '../../data/posts'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { imageUpload } from '../../firebase'
import PostForm from '../../components/Forms/PostForm'
import { useParams } from 'react-router'
import { useMutation, useQuery } from 'react-query'

function EditPost() {
  const params = useParams()
  const API_PATH = 'http://localhost:4000/api'

  const { sendNotification } = useNotificationContext()
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  // const { post: oldPost } = getPostById(params.id)

  const fetchPost = async () => {
    const response = await fetch(`${API_PATH}/posts/${params.id}`)
    const r = await response.json()
    return r.post
  }

  const updatePost = async data => {
    await fetch(`${API_PATH}/posts/${oldPost.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: data }),
    })
  }

  const { data: oldPost } = useQuery('postData', fetchPost)

  const { mutate } = useMutation(updatePost, {
    onSuccess: data => {
      // console.log(data)
      setLoading(false)
      sendNotification('success', 'Post updated', false)
      navigate('/posts')
    },
    onError: () => {
      setLoading(false)
      sendNotification('error', 'failed to update post', false)
    },
  })

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
      userId: oldPost.userId,
    }

    mutate(post)
    // editPost(post)
    // setLoading(false)
    // sendNotification('success', 'Post Updated', false)
    // navigate('/posts')
  }

  return (
    // allow user to edit post's information include, title, content, and image
    <PostForm
      loading={isLoading}
      onSubmit={onSubmit}
      formName="Edit Post"
      defaultValue={oldPost}
    />
  )
}

export default EditPost
