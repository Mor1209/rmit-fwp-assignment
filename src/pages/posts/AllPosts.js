import { getAllPosts, deletePost } from '../../data/posts'
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
import { getUser } from '../../data/users'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import cardImage from '../../assets/r.webp'
import capitalize from '../../helpers/capitalize'

function AllPosts() {
  const [allPosts, setAllPosts] = useState()
  const [filteredPosts, setFilterPosts] = useState()
  const { sendNotification } = useNotificationContext()
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    // fetching for all posts
    const posts = getAllPosts()
    setAllPosts(posts)
    setFilterPosts(posts)
  }, [])

  const handleDeletePost = id => {
    // delete a post
    const remainPosts = deletePost(id)
    if (remainPosts === null) {
      sendNotification('error', 'Unable to Delete Post', false)
      return
    }
    setAllPosts(remainPosts)
    setFilterPosts(remainPosts)
    sendNotification('success', 'Post Delete', false)
  }

  return (
    <Container sx={{ height: '100%', marginBottom: 10 }}>
      <Typography variant="h3" color={'white'} fontWeight={'bold'}>
        All Posts
      </Typography>
      <Box m={1} display={'flex'} justifyContent={'space-between'}>
        {filteredPosts === allPosts ? (
          <Button
            variant="contained"
            sx={{ margin: 2, float: 'right' }}
            onClick={() => {
              setFilterPosts(
                allPosts.filter(post => post.userId === user.userId)
              )
            }}
          >
            My posts
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: 2, float: 'right' }}
            onClick={() => {
              setFilterPosts(allPosts)
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
        {filteredPosts &&
          filteredPosts.map(post => {
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
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: '10px',
                    }}
                  >
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
