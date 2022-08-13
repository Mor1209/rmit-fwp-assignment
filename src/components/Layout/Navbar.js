import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import '../../App.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate, NavLink } from 'react-router-dom'

const menuButtons = ['home', 'posts']

function Navbar() {
  let activeStyle = {
    color: 'currentColor',
    cursor: 'not-allowed',
    opacity: '0.5',
    textDecoration: 'underline',
  }

  const authCtx = useAuthContext()
  const navigate = useNavigate()
  const authButtons = !authCtx.isAuth ? (
    <>
      <Button
        sx={{
          color: 'white',
          display: 'block',
          margin: '10px',
          fontSize: '1rem',
        }}
        onClick={() => navigate('/register')}
      >
        Register
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
      position="static"
      style={{
        paddingLeft: '10%',
        paddingRight: '20%',
        paddingTop: '2%',
        paddingBottom: '2%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
      title="Loop Agile"
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
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
            key={page}
            sx={{
              color: 'white',
              display: 'block',
              margin: '10px',
              fontSize: '1rem',
            }}
          >
            <NavLink
              to={`/${page}`}
              style={({ isActive }) =>
                isActive
                  ? activeStyle
                  : { color: 'white', textDecoration: 'none' }
              }
            >
              {page}
            </NavLink>
          </Button>
        ))}
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }} />
        {authButtons}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
