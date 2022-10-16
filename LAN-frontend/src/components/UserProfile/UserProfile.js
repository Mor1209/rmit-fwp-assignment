import { Paper, Stack } from '@mui/material'
import UserAvatar from '../UI/UserAvatar'
import EditUser from './EditUser'
import UserProfileDetails from './UserProfileDetails'

// User Profile wrapper, which includes the edit user actions and user details
const UserProfile = ({ test = false, testUser = null }) => {
  return (
    <Paper elevation={5} sx={{ overflow: 'hidden' }}>
      <Paper
        elevation={0}
        sx={{
          background:
            'linear-gradient(140deg, rgba(90,9,121,1) 0%, rgba(222,16,214,1) 0%, rgba(0,142,255,1) 100%)',
          width: '100%',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          mb: 8,
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          sx={{ position: 'relative', top: 47, pl: 3, pr: 1 }}
        >
          <UserAvatar testUser={testUser} test={test} size={140} border={3} />
          <EditUser />
        </Stack>
      </Paper>
      <Stack
        direction="row"
        justifyContent="flex-start"
        sx={{ pl: 3, pr: 3, pb: 3 }}
      >
        <UserProfileDetails testUser={testUser} test={test} />
      </Stack>
    </Paper>
  )
}

export default UserProfile
