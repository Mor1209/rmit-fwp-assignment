import { Container } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import LoginForm from '../components/Forms/LoginForm'

const Login = () => {
  return (
    // <div className="form">
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <LoginForm />
    </Container>
    // </div>
  )
}

export default Login
