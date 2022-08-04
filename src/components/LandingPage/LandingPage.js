import {
  Container,
  Divider,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import MainImage from '../../assets/t.webp';
import ThumbImage from '../../assets/r.webp';

function LandingPage() {
  const items = ['P1', 'P2', 'P3'];
  return (
    <Container>
      <div className="welcome">
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Georgia',
          }}
        >
          Welcome
        </Typography>
        <p>sometext sometext</p>
        <Box>
          <Button variant="contained" sx={{ marginRight: '2px' }}>
            More Info
          </Button>
          <Button variant="outlined" sx={{ marginLeft: '2px' }}>
            Sign Up
          </Button>
        </Box>
      </div>
      <Typography variant="h5">Popular Posts</Typography>
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
          <Card sx={{ width: 350, alignItems: 'center' }}>
            <CardMedia component="img" height="140" image={ThumbImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {page}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                porttitor quis nisi et interdum. Aliquam erat volutpat. Quisque
                vulputate condimentum tempor. Nullam ut faucibus ante. Quisque
                in dolor nec tellus hendrerit convallis ac non leo. Suspendisse
                nec leo ut quam gravida mollis a ac mauris. Quisque nec vehicula
                metus,
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                More Info
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default LandingPage;
