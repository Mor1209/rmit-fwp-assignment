import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Container } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const menuButtons = [
  { name: 'home', url: '' },
  { name: 'posts', url: 'posts' },
]

function Navbar() {
  const authCtx = useAuthContext()
  const navigate = useNavigate()
  const [background, setBackground] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  let activeStyle = {
    color: 'currentColor',
    cursor: 'not-allowed',
    opacity: '0.5',
    textDecoration: 'underline',
  }

  const handleOpenUserMenu = event => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleCloseUserMenu = e => {
    setUserMenuAnchor(null)

    if (e.target.id === 'logout') {
      authCtx.logout()
    }
  }

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
    <>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box>
        <Tooltip title="User Menu" placement="bottom-end">
          <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Typography color="white">{authCtx.user.name}</Typography>
            <ExpandMoreIcon sx={{ color: 'white' }} />
          </Button>
        </Tooltip>
        <Menu
          open={!!userMenuAnchor}
          onClose={handleCloseUserMenu}
          id="user-menu"
          keepMounted
          anchorEl={userMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ mt: 4 }}
        >
          <MenuItem
            id="profile"
            component={NavLink}
            to={'/profile'}
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem id="logout" onClick={handleCloseUserMenu}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
  return (
    <AppBar
      position="sticky"
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
        mb: 5,
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
                component={NavLink}
                to={`/${page.url}`}
                sx={{
                  color: 'white',
                  display: 'block',
                  margin: '10px',
                  fontSize: '1rem',
                }}
                style={({ isActive }) =>
                  isActive
                    ? activeStyle
                    : { color: 'white', textDecoration: 'none' }
                }
              >
                {page.name}
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
