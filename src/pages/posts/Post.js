/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Container, Typography, Stack } from '@mui/material'
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
      <Container
        sx={{
          color: 'black',
          textAlign: 'center',
          minHeight: ' 40vh',
          backgroundColor: 'white',
          width: 'auto',
        }}
        disableGutters
      >
        <BannerImage url={post?.image} />
        {/* render out post data and display image if any */}
        {post && (
          <>
            <Typography p={2} variant={'h3'}>
              {post.title}
            </Typography>

            <Typography
              sx={{ opacity: 0.7, fontStyle: 'italic' }}
              variant={'h7'}
            >
              by <b>{post.author}</b>
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
              p={5}
            >
              {post?.image && (
                <img
                  src={post?.image}
                  alt="uploadedImage"
                  style={{
                    border: '10px solid lightgrey',
                    borderRadius: '4px',
                    height: 160,
                    weidth: 160,
                    objectFit: 'fit',
                    display: 'flex',
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'start',
                  width: '1000px',
                }}
              >
                {post.content}
              </Typography>
            </Stack>
          </>
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
          padding: '10px',
        }}
      >
        <hr />
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
