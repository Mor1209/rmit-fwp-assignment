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
  const items = ['P1', 'P2', 'P3']
  const navigate = useNavigate()

  return (
    <Container>
      <div className="welcome">
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Georgia',
            color: 'white',
          }}
        >
          Welcome
        </Typography>
        <p>Loop Agile Now</p>
        <Box>
          <Button
            variant="contained"
            sx={{ margin: '2px' }}
            onClick={() => {
              navigate('/register')
            }}
          >
            Sign Up Now
          </Button>
          <Button
            variant="outlined"
            sx={{
              margin: '2px',
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
        sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }}
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
        marginBottom={1}
      >
        {items.map(page => (
          <Grid>
            <Card sx={{ width: 350, alignItems: 'center' }}>
              <CardMedia component="img" height="140" image={ThumbImage} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {page}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris porttitor quis nisi et interdum. Aliquam erat volutpat.
                  Quisque vulputate condimentum tempor. Nullam ut faucibus ante.
                  Quisque in dolor nec tellus hendrerit convallis ac non leo.
                  Suspendisse nec leo ut quam gravida mollis a ac mauris.
                  Quisque nec vehicula metus,
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
