/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import BannerImage from '../../components/Layout/BannerImage'
import Comment from '../../components/ThreadedChat/Comment'
import CommentForm from '../../components/Forms/CommentForm'
import { createComment, getPostById } from '../../data/posts'
import { useNotificationContext } from '../../hooks/useNotificationContext'

function Post() {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [selectedComment, setSelectedComment] = useState(null)
  const [comments, setComments] = useState([])
  const { sendNotification } = useNotificationContext()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // get both post and post's comments
    const { post, comments } = getPostById(params.id)
    setPost(post)
    setComments(comments)
  }, [])

  const addComment = async (data, postId, parentId, reset) => {
    setLoading(true)
    const newComment = await createComment(data, postId, parentId)

    if (newComment === 'error') {
      sendNotification('error', 'Failed to Upload Image', false)
      return
    }

    setComments([...comments, newComment])
    setSelectedComment(null)
    reset()
    setLoading(false)
  }

  const getCommentReplies = id => {
    return comments.filter(comment => comment.parentId === id)
  }

  return (
    <>
      <BannerImage />
      <Container
        sx={{
          color: 'white',
          textAlign: 'start',
          minHeight: '300px',
        }}
      >
        {/* render out post data and display image if any */}
        {post && (
          <>
            <Typography m={2} variant={'h3'}>
              {post.title}
            </Typography>
            <p>{post.content}</p>
          </>
        )}

        {post?.image && (
          <img
            src={post?.image}
            alt="uploadedImage"
            style={{
              margin: 5,
              padding: 10,
              height: 160,
              weidth: 160,
              objectFit: 'fit',
            }}
          ></img>
        )}
      </Container>
      {/* render the comment section */}
      <Container
        sx={{
          color: 'black',
          textAlign: 'start',
          backgroundColor: 'white',
          minHeight: '200px',
          marginBottom: '3rem',
          borderRadius: '25px',
          padding: '10px',
        }}
      >
        <Typography variant={'h5'} sx={{ padding: 2 }}>
          Comments
        </Typography>

        <CommentForm
          type={'comment'}
          submit={addComment}
          postId={post?.id}
          parentId={null}
          loading={isLoading}
        />

        <hr />
        {comments &&
          comments.map(comment => {
            if (comment.parentId === null)
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  selectedComment={selectedComment}
                  setSelectedComment={setSelectedComment}
                  addComment={addComment}
                  postId={post?.id}
                  getReplies={getCommentReplies}
                  loading={isLoading}
                />
              )
            return null
          })}
      </Container>
    </>
  )
}

export default Post
