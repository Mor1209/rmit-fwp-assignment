import { Container } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import RegisterForm from '../components/Forms/RegisterForm'

const Register = () => {
  return (
    <div className="form">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <RegisterForm />
      </Container>
    </div>
  )
}

export default Register
