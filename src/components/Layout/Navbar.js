import {
  AppBar,
  Container,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Button,
  Box,
} from '@mui/material';
import '../../App.css';
import { makeStyles } from '@mui/material/styles';

const userPages = ['Signup', 'Login'];

function NavBar() {
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
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 'bolder',
            color: 'inherit',
            textDecoration: 'None',
          }}
        >
          Loop Agile
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button sx={{ my: 2, ml: 0.5, color: 'white', display: 'block' }}>
            Posts
          </Button>
          <Button sx={{ my: 2, ml: 0.5, color: 'white', display: 'block' }}>
            #
          </Button>
        </Box>
        {userPages.map(page => (
          <Button key={page} sx={{ color: 'white', display: 'block' }}>
            {page}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
