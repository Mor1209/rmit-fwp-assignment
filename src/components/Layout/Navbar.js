import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import '../../App.css';

const userPages = ['Signup', 'Login'];
const menuButtons = ['Home', 'Posts'];

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
          <Button key={page} sx={{ color: 'white', display: 'block' }}>
            {page}
          </Button>
        ))}
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }} />
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
