import { allPosts } from '../../data/posts'
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
function AllPosts() {
  const posts = allPosts()
  const navigate = useNavigate()
  const user = getUser()
  return (
    <Container sx={{ height: '100%', marginBottom: 10 }}>
      <Typography variant="h3" color={'white'} fontWeight={'bold'}>
        All Posts
      </Typography>
      <Box m={1} display={'flex'} justifyContent={'space-between'}>
        <Button
          variant="contained"
          sx={{ margin: 2, float: 'right' }}
          onClick={() => {
            navigate(`/posts/${user.email}`)
          }}
        >
          My posts
        </Button>
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
        {posts &&
          posts.map(post => {
            return (
              <Grid item xs={4} key={post.id}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    // image="/static/images/cards/contemplative-reptile.jpg"
                    alt="image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title} by {post.author}
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
                      onClick={() => {
                        console.log(post.title)
                      }}
                    >
                      Delete
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
