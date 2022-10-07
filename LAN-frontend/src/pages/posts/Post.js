/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router'
import { useState } from 'react'
import { Container, Typography, Stack, capitalize } from '@mui/material'
import capEveryWord from '../../helpers/capitalize'
import BannerImage from '../../components/Layout/BannerImage'
import Comment from '../../components/ThreadedChat/Comment'
import CommentForm from '../../components/Forms/CommentForm'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useQuery, useMutation } from 'react-query'
import { createComment, fetchPost, fetchComments } from '../../data/api'
import { useQueryClient } from 'react-query'

function Post() {
  const params = useParams()
  const queryClient = useQueryClient()
  const [selectedComment, setSelectedComment] = useState(null)
  const { sendNotification } = useNotificationContext()
  const [isLoading2, setLoading] = useState(false)

  const { data: comments } = useQuery(['comments', params.id], () =>
    fetchComments(params.id)
  )

  const { data: post } = useQuery(['post', params.id], () =>
    fetchPost(params.id)
  )

  const { mutate } = useMutation(createComment, {
    onSuccess: data => {
      setLoading(false)
      const comment = data.comment
      queryClient.setQueriesData('comments', oldData => [...oldData, comment])
      sendNotification('success', 'comment created', false)
    },
    onError: () => {
      setLoading(false)
      sendNotification('error', 'failed to create comment', false)
    },
  })

  const addComment = async (data, postId, parentId, userId, reset) => {
    setLoading(true)

    const newComment = {
      content: data.comment,
      image: data.image,
      parentId: parentId,
      postId: postId,
      userId: userId,
    }

    mutate(newComment)
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
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
        disableGutters
      >
        <BannerImage url={post?.image} />
        {/* render out post data and display image if any */}
        {post && (
          <>
            <Typography p={2} variant={'h3'}>
              {capitalize(post.title)}
            </Typography>

            <Typography
              sx={{ opacity: 0.7, fontStyle: 'italic' }}
              variant={'h7'}
            >
              by <b>{capEveryWord(post.author)}</b>
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={5}
              p={5}
            >
              {/* make the image on the left of the paragraph */}
              {post?.image && (
                <img
                  src={post?.image}
                  alt="uploadedImage"
                  style={{
                    border: '10px solid lightgrey',
                    borderRadius: '4px',
                    maxHeight: 200,
                    maxWidth: '60%',
                    objectFit: 'fit',
                    display: 'flex',
                  }}
                />
              )}

              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'start',
                  width: '1000px',
                }}
              />
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
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
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
          loading={isLoading2}
        />

        <hr />
        {comments &&
          comments.map(comment => {
            // only render the root comments not replies
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
                  loading={isLoading2}
                />
              )
            return null
          })}
      </Container>
    </>
  )
}

export default Post
