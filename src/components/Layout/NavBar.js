import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const authCtx = useAuthContext()
  const navigate = useNavigate()

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
    <Button
      color={'secondary'}
      variant="contained"
      onClick={() => authCtx.logout()}
    >
      Logout
    </Button>
  )

  return (
    <AppBar position="static">
      <Toolbar>{authButtons}</Toolbar>
    </AppBar>
  )
}

export default NavBar
