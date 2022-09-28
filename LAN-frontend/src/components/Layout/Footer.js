import { Button, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Link as RouterLink } from 'react-router-dom'

function Footer() {
  // links are currently placeholders and disabled
  const links = ['Terms', 'Privacy Policy', 'Contact']
  return (
    <footer>
      <Paper
        square
        sx={{
          position: 'sticky',
          bottom: 0,
          margin: 'auto',
          backgroundColor: '#95A6B7',
          padding: 2,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                &copy; Copyright By Loop Agile Now
              </Typography>
            </Grid>
            <Grid item>
              {links.map(page => (
                <Button
                  component={RouterLink}
                  key={page}
                  to={`/${page}`}
                  sx={{ color: 'black' }}
                  disabled
                >
                  {page}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </footer>
  )
}

export default Footer
