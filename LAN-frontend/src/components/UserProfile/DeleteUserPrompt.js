import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

const DeleteUserPrompt = props => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6">
        Are you sure you want to delete your account ?
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mt: 4 }}
      >
        <Button id="confirm" onClick={props.handleToggle} color="error">
          Confirm
        </Button>
        <Button id="cancel" onClick={props.handleToggle}>
          Cancel
        </Button>
      </Stack>
    </Box>
  )
}

export default DeleteUserPrompt
