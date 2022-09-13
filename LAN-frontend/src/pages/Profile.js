import { Container } from '@mui/system'
import { CssBaseline } from '@mui/material'
import UserProfile from '../components/UserProfile/UserProfile'

const Profile = () => {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <UserProfile />
    </Container>
  )
}

export default Profile
