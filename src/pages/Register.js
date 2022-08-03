import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Typography,
  Button,
  FormHelperText,
} from '@mui/material';
import { Container } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuthContext } from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// ES6
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup); // extend yup

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().password().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'passwords must match'),
  })
  .required();

const Register = () => {
  const authCtx = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    authCtx.register(data);
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
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            error={errors.name ? true : false}
            fullWidth
            sx={{ mt: 1 }}
          >
            <InputLabel htmlFor="user">Name</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              label="Name"
              {...register('name')}
            />
            <FormHelperText>
              {errors.name?.message &&
                errors.name?.message.charAt(0).toUpperCase() +
                  errors.name?.message.slice(1)}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={errors.email ? true : false}
            fullWidth
            sx={{ mt: 1 }}
          >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              label="Email Address"
              {...register('email')}
            />
            <FormHelperText>
              {errors.email?.message &&
                errors.email?.message.charAt(0).toUpperCase() +
                  errors.email?.message.slice(1)}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={errors.password ? true : false}
            fullWidth
            sx={{ mt: 1 }}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Password"
              type="password"
              {...register('password')}
            />
            <FormHelperText>
              {errors.password?.message &&
                errors.password?.message.charAt(0).toUpperCase() +
                  errors.password?.message.slice(1)}
            </FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            error={errors.confirmPassword ? true : false}
            sx={{ mt: 1 }}
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
            />
            <FormHelperText>
              {errors.confirmPassword?.message &&
                errors.confirmPassword?.message.charAt(0).toUpperCase() +
                  errors.confirmPassword?.message.slice(1)}
            </FormHelperText>
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
      {authCtx.isAuth && `Hello ${authCtx.user.name}`}
    </Container>
  );
};

export default Register;
