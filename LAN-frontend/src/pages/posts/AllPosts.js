import { deletePost } from '../../data/posts'
import {
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material'
// import { getUser } from '../../data/users'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import cardImage from '../../assets/r.webp'
import capitalize from '../../helpers/capitalize'
import { useQuery, useMutation } from 'react-query'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from 'axios'

function AllPosts() {
  const API_PATH = 'http://localhost:4000/api'
  const [allPosts, setAllPosts] = useState()
  const [filteredPosts, setFilterPosts] = useState()
  const { sendNotification } = useNotificationContext()
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const fetchAllPosts = async () => {
    const { data } = await axios.get(`${API_PATH}/posts`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })

    return data.posts
  }

  const deletePost = async id => {
    await axios.get(`${API_PATH}/posts/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: data }),
    })
  }

  const { mutate } = useMutation(deletePost, {
    onSuccess: data => {
      sendNotification('success', 'Post deleted', false)
    },
    onError: () => {
      sendNotification('error', 'failed to delete post', false)
    },
  })

  const { data } = useQuery('posts', fetchAllPosts)

  const handleDeletePost = id => {
    mutate(id)
  }

  return (
    <Container sx={{ height: '100%', marginBottom: 10 }}>
      <Typography variant="h3" color={'white'} fontWeight={'bold'}>
        All Posts
      </Typography>
      <Box m={1} display={'flex'} justifyContent={'space-between'}>
        {/* filter button that only displays posts made by the current logged in user */}
        {filteredPosts === allPosts ? (
          <Button
            variant="contained"
            sx={{ margin: 2, float: 'right' }}
            onClick={() => {
              setFilterPosts(data.filter(post => post.userId === user.userId))
            }}
          >
            My posts
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: 2, float: 'right' }}
            onClick={() => {
              setFilterPosts(data)
            }}
          >
            All Posts
          </Button>
        )}

        <Button
          variant="contained"
          sx={{ margin: 2, float: 'right' }}
          onClick={() => {
            navigate('/posts/new')
          }}
        >
          Make Your Post
        </Button>
      </Box>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {/* redner all the posts that's in localstroage */}
        {data &&
          data.map(post => {
            return (
              <Grid item xs={4} key={post.id}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.image !== null ? post.image : cardImage}
                    alt="image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {capitalize(post.title)} by {capitalize(post.author)}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary"> */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    {/* </Typography> */}
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: '10px',
                    }}
                  >
                    {/* only the author of the post can delete and edit the post */}

                    {user.id === post.userId ? (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/posts/edit/${post.id}`)}
                        >
                          Edit
                        </Button>
                      </>
                    ) : null}

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      View Post
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
      </Grid>
    </Container>
  )
}

export default AllPosts
