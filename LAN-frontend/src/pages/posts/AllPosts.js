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
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import cardImage from '../../assets/r.webp'
import capitalize from '../../helpers/capitalize'
import { useQuery, useMutation } from 'react-query'
import { useAuthContext } from '../../hooks/useAuthContext'
import { fetchAllPosts, deletePost } from '../../data/api'
import { useQueryClient } from 'react-query'

function AllPosts({ test }) {
  const queryClient = useQueryClient()
  const { sendNotification } = useNotificationContext()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [filter, setFilter] = useState(false)

  const { mutate } = useMutation(deletePost, {
    onSuccess: data => {
      const posts = data.posts
      queryClient.setQueriesData('posts', posts)
      sendNotification('success', 'comment created', false)
    },
    onError: () => {
      sendNotification('error', 'failed to delete post', false)
    },
  })

  const { data } = useQuery('posts', () => fetchAllPosts(true), {
    enabled: !filter,
  })
  // console.log(data)
  return (
    <Container sx={{ height: '100%', marginBottom: 10 }}>
      <Typography variant="h3" color={'white'} fontWeight={'bold'}>
        All Posts
      </Typography>

      <Box m={1} display={'flex'} justifyContent={'space-between'}>
        {/* filter button that only displays posts made by the current logged in user */}
        {filter === false ? (
          <Button
            variant="contained"
            sx={{ margin: 2, float: 'right' }}
            onClick={() => {
              queryClient.setQueriesData(
                'posts',
                data.filter(post => post.userId === user.id)
              )
              setFilter(true)
            }}
          >
            My posts
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: 2, float: 'right' }}
            onClick={() => {
              setFilter(false)
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
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
                          onClick={() => mutate(parseInt(post.id))}
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
