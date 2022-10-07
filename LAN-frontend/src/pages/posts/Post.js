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
import axios from 'axios'

function Post() {
  const API_PATH = 'http://localhost:4000/api'
  const params = useParams()

  // const [comments, setComments] = useState([])
  const [selectedComment, setSelectedComment] = useState(null)
  const { sendNotification } = useNotificationContext()
  const [isLoading2, setLoading] = useState(false)

  const fetchPost = async () => {
    const { data } = await axios.get(`${API_PATH}/posts/${params.id}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })

    return data.post
  }

  const fetchComments = async () => {
    const { data } = await axios.get(`${API_PATH}/comments/${params.id}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    return data.comments
  }

  const { data: comments } = useQuery('comments', fetchComments, {
    onSuccess: data => {
      console.log(data)
    },
  })
  const { data: post } = useQuery('post', fetchPost)

  // console.log(comments)

  const createComment = async comment => {
    const { data } = await axios.post(
      API_PATH + '/comments',
      { comment: comment },
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

  const { mutate } = useMutation(createComment, {
    onSuccess: data => {
      setLoading(false)
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
    // console.log(newComment)
    mutate(newComment)
    reset()
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
        {console.log(comments)}
        {comments &&
          comments.map(comment => {
            // only render the root comments not replies
            if (true)
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
