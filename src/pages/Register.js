import { Container } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import RegisterForm from '../components/Forms/RegisterForm'

const Register = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <RegisterForm />
    </Container>
  )
}

export default Register
