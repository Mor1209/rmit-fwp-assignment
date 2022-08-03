import React, { useState } from 'react';
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
import { useAuthContext } from '../hooks/useAuthContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const { register, isAuth, user } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();

    formIsValid && register({ firstName, lastName, email, password });
  };

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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <FormControl fullWidth sx={{ mt: 1, pr: 1 }}>
              <InputLabel htmlFor="user-first-name">First Name</InputLabel>
              <OutlinedInput
                id="user-first-name"
                label="First Name"
                value={firstName}
                required
                onChange={e => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel htmlFor="user-last-name">Last Name</InputLabel>
              <OutlinedInput
                id="user-last-name"
                label="Last Name"
                value={lastName}
                required
                onChange={e => setLastName(e.target.value)}
              />
            </FormControl>
          </Box>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel htmlFor="user-email">Email Address</InputLabel>
            <OutlinedInput
              id="user-email"
              label="Email Address"
              value={email}
              type="email"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel htmlFor="user-password">Password</InputLabel>
            <OutlinedInput
              id="user-password"
              label="Password"
              value={password}
              type="password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
      {isAuth && `Hello ${user.firstName}`}
    </Container>
  );
};

export default Register;
