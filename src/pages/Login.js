import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Container } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '8px',
          border: '1px solid #dadce0',
          padding: 6,
        }}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box component="form">
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel htmlFor="user-email">Email address</InputLabel>
            <OutlinedInput id="user-email" label="Email address" required />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel htmlFor="user-password">Password</InputLabel>
            <OutlinedInput id="user-password" label="Password" required />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
