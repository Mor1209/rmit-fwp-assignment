/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router'
import { getPostById } from '../../data/posts'
import { useEffect, useState } from 'react'
// import BannerImage from '../../assets/r.webp'
import { Container, Typography, Button, Box } from '@mui/material'
import BannerImage from '../../components/Layout/BannerImage'
import Comment from '../../components/ThreadedChat/Comment'

function Post() {
  const params = useParams()
  const [post, setPost] = useState(null)

  let comments = [
    { id: 1, comment: 'test', parentId: null, user: 'someone' },
    { id: 2, comment: 'test2', parentId: null, user: 'somoene' },
  ]

  let replies = [
    { id: 1, comment: 'fsdf', parentId: 1, user: 'reply' },
    // { id: 2, comment: 'ffest', parentId: 2, user: 'reply' },
  ]

  useEffect(() => {
    setPost(getPostById(params.id))
  }, [])

  return (
    <>
      <BannerImage />
      <Container
        sx={{
          // height: '80vh',
          color: 'white',
          textAlign: 'start',
          minHeight: '300px',
        }}
      >
        {post && (
          <>
            <Typography m={2} variant={'h3'}>
              {post.title}
            </Typography>
            <p>{post.content}</p>
          </>
        )}
      </Container>
      <Container
        sx={{
          // height: 'auto',
          color: 'black',
          textAlign: 'start',
          backgroundColor: 'white',
          minHeight: '200px',
          // display: 'flex',
          // justifyContent: 'start',
          marginBottom: '3rem',
          borderRadius: '25px',
        }}
      >
        <Box m={3} display={'flex'} justifyContent={'space-between'}>
          <Typography variant={'h5'}>Comments</Typography>
          <Button variant="contained" size="medium">
            Reply
          </Button>
        </Box>
        <hr />
        {comments &&
          comments.map(comment => {
            return (
              <Comment key={comment.id} comment={comment} replies={replies} />
            )
          })}
      </Container>
    </>
  )
}

export default Post
