import { IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import EditUserForm from './Forms/EditUserForm'
import BasicModal from './UI/BasicModal'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const EditUser = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleModalToggle = () => setModalIsOpen(!modalIsOpen)

  return (
    <>
      <Stack direction="row">
        <IconButton aria-label="edit" onClick={handleModalToggle}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleModalToggle}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
      <BasicModal open={modalIsOpen} close={handleModalToggle}>
        <EditUserForm onSuccess={handleModalToggle} />
      </BasicModal>
    </>
  )
}

export default EditUser
