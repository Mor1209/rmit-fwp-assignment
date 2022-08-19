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
} from '@mui/material'
import ThumbImage from '../assets/r.webp'
import { useNavigate } from 'react-router'

function LandingPage() {
  const items = [
    {
      title: 'Loop Agile',
      content:
        'Loop Agile (LA) is a fast-growing firm with offices in major metropolitan cities in Australia... ',
      id: 1,
    },
    {
      title: 'More Info',
      content:
        'Loop Agile Now is a social meida webiste that is used by the IT Consultancy firm ',
      id: 2,
    },
    {
      title: 'Posts Tutorial',
      content: 'You need register for an account before making a posts',
      id: 3,
    },
  ]

  const navigate = useNavigate()

  return (
    <Container>
      <div className="welcome">
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Georgia',
            color: 'white',
            fontSize: '10rem',
          }}
        >
          Welcome
        </Typography>
        <p>Loop Agile Now</p>
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
              },
            }}
            onClick={() => {
              navigate('#')
            }}
          >
            More Info
          </Button>
        </Box>
      </div>
      <Typography
        variant="h5"
        sx={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginTop: '70px',
          marginBottom: '20px',
        }}
      >
        Popular Posts
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}
        spacing={0}
        marginTop={1}
        marginBottom={10}
      >
        {items.map(page => (
          <Grid key={page.id}>
            <Card sx={{ width: 350, alignItems: 'center', minHeight: '350px' }}>
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
