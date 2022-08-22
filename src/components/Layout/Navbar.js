import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material'
import '../../App.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Container } from '@mui/system'

const menuButtons = [
  { name: 'home', url: '' },
  { name: 'posts', url: 'posts' },
]

function Navbar() {
  let activeStyle = {
    color: 'currentColor',
    cursor: 'not-allowed',
    opacity: '0.5',
    textDecoration: 'underline',
  }

  const authCtx = useAuthContext()
  const navigate = useNavigate()
  const [background, setBackground] = useState(false)

  const handleBackgroundChange = () => {
    if (window.scrollY > 50) {
      setBackground(true)
    } else {
      setBackground(false)
    }
  }

  window.addEventListener('scroll', handleBackgroundChange)
  const authButtons = !authCtx.isAuth ? (
    <>
      <Button
        label="Register"
        sx={{
          color: 'white',
          display: 'block',
          margin: '10px',
          fontSize: '1rem',
        }}
        onClick={() => navigate('/register')}
      >
        <Typography> Register </Typography>
      </Button>
      <Button
        sx={{
          color: 'white',
          display: 'block',
          margin: '10px',
          fontSize: '1rem',
        }}
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </>
  ) : (
    <Button
      onClick={() => authCtx.logout()}
      sx={{
        color: 'white',
        display: 'block',
        margin: '10px',
        fontSize: '1rem',
      }}
    ></Button>
  )
  return (
    <AppBar
      position="sticky"
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: background ? '' : 'Transparent',
        boxShadow: background ? '' : 'none',
        height: 90,
      }}
      title="Loop Agile"
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Stack direction="row">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 'bolder',
                color: 'inherit',
                textDecoration: 'None',
                paddingRight: '35px',
                fontSize: '2rem',
              }}
            >
              Loop Agile Now
            </Typography>
            {menuButtons.map(page => (
              <Button
                key={page.name}
                sx={{
                  color: 'white',
                  display: 'block',
                  margin: '10px',
                  fontSize: '1rem',
                }}
              >
                <NavLink
                  to={`/${page.url}`}
                  style={({ isActive }) =>
                    isActive
                      ? activeStyle
                      : { color: 'white', textDecoration: 'none' }
                  }
                >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Stack>

          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }} />
          {authButtons}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
