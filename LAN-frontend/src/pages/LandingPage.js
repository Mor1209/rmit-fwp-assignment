import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material'
import ThumbImage from '../assets/r.webp'
import { useNavigate } from 'react-router'
import { useRef } from 'react'

function LandingPage() {
  const items = [
    {
      title: 'Loop Agile',
      content:
        'Loop Agile (LA) is a fast-growing firm with offices in major metropolitan cities in Australia... ',
    },
    {
      title: 'More Info',
      content:
        'Loop Agile Now is a social meida webiste that is used by the IT Consultancy firm ',
    },
    {
      title: 'Posts Tutorial',
      content: 'You need register for an account before making a posts',
    },
  ]

  const navigate = useNavigate()
  const popularPostsRef = useRef()

  return (
    <Container>
      <Stack sx={{ color: 'white', height: '90vh' }} alignItems="center">
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Georgia',
            color: 'white',
            mt: '10vh',
            pb: 5,
            fontSize: {
              lg: 200,
              md: 135,
              sm: 120,
              xs: 65,
            },
          }}
        >
          Welcome
        </Typography>
        <Typography variant="h5" sx={{ pb: 2 }}>
          Loop Agile Now
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{ margin: '4px' }}
            onClick={() => {
              navigate('/register')
            }}
          >
            Sign Up Now
          </Button>
          <Button
            variant="outlined"
            sx={{
              margin: '4px',
              '&:hover': {
                background: 'white',
                color: 'rgb(25,118,210)',
              },
              color: 'white',
              borderColor: 'white',
            }}
            onClick={() => {
              window.scrollTo({
                top: popularPostsRef.current.offsetTop - 100,
                behavior: 'smooth',
              })
            }}
          >
            More Info
          </Button>
        </Box>
      </Stack>
      <Typography
        variant="h5"
        sx={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginTop: '70px',
          marginBottom: '20px',
        }}
        ref={popularPostsRef}
      >
        Popular Posts
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent={'space-around'}
        spacing={2}
        marginTop={1}
        marginBottom={5}
      >
        {items.map(page => (
          <Grid item key={page.title}>
            <Card sx={{ width: 350, minHeight: '350px' }}>
              <CardMedia component="img" height="140" image={ThumbImage} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {page.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {page.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  More Info
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default LandingPage
