import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import '../../App.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const menuButtons = ['home', 'posts']

function Navbar() {
  const authCtx = useAuthContext()
  const navigate = useNavigate()
  const authButtons = !authCtx.isAuth ? (
    <>
      <Button
        sx={{ color: 'white', display: 'block' }}
        onClick={() => navigate('/register')}
      >
        Register
      </Button>
      <Button
        sx={{ color: 'white', display: 'block' }}
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </>
  ) : (
    <Button
      onClick={() => authCtx.logout()}
      sx={{ color: 'white', display: 'block' }}
    >
      Logout
    </Button>
  )
  return (
    <AppBar
      position="static"
      style={{ paddingLeft: '20%', paddingRight: '20%' }}
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
          }}
        >
          Loop Agile Now
        </Typography>
        {menuButtons.map(page => (
          <Button
            key={page}
            sx={{ color: 'white', display: 'block' }}
            onClick={() => {
              navigate(`/${page}`)
            }}
          >
            {page}
          </Button>
        ))}
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }} />
        {authButtons}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
