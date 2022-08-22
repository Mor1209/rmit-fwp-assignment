import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'

const Navbar = () => {
  const authCtx = useAuthContext()
  const navigate = useNavigate()
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  const handleOpenUserMenu = event => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleCloseUserMenu = e => {
    setUserMenuAnchor(null)

    if (e.target.id === 'logout') {
      authCtx.logout()
    }
  }

  const authButtons = !authCtx.isAuth ? (
    <>
      <Button
        color={'secondary'}
        variant="contained"
        onClick={() => navigate('/register')}
        sx={{ mr: 1 }}
      >
        Register
      </Button>
      <Button
        color={'secondary'}
        variant="contained"
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
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>{authButtons}</Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
