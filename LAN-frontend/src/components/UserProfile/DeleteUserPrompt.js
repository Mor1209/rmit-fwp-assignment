import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useUpdateUser } from '../../hooks/useUpdateUser'

const DeleteUserPrompt = ({ handleToggle }) => {
  const { deleteMutation } = useUpdateUser({ handleToggle })
  const handleDelete = () => {
    deleteMutation.mutate()
  }

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
        {deleteMutation.isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Button id="confirm" onClick={handleDelete} color="error">
              Confirm
            </Button>
            <Button id="cancel" onClick={handleToggle}>
              Cancel
            </Button>
          </>
        )}
      </Stack>
    </Box>
  )
}

export default DeleteUserPrompt
