import { Button, IconButton, Stack, Typography, Box } from '@mui/material'
import React, { useState } from 'react'
import EditUserForm from './Forms/EditUserForm'
import BasicModal from './UI/BasicModal'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { deleteUser } from '../data/users'
import { useAuthContext } from '../hooks/useAuthContext'

const EditUser = () => {
  const { logout } = useAuthContext()
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)

  const handleEditToggle = () => setEditIsOpen(!editIsOpen)
  const handleDeleteToggle = e => {
    if (e.target.id === 'confirm') {
      deleteUser()
      logout()
    }

    setDeleteIsOpen(!deleteIsOpen)
  }

  return (
    <>
      <Stack direction="row">
        <IconButton aria-label="edit" onClick={handleEditToggle}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteToggle}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
      <BasicModal open={editIsOpen} close={handleEditToggle}>
        <EditUserForm onSuccess={handleEditToggle} />
      </BasicModal>
      <BasicModal open={deleteIsOpen} close={handleDeleteToggle}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5">
            Are you sure you want to delete your account ?
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{ mt: 4 }}
          >
            <Button id="confirm" onClick={handleDeleteToggle} color="error">
              Confirm
            </Button>
            <Button id="cancel" onClick={handleDeleteToggle}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </BasicModal>
    </>
  )
}

export default EditUser
