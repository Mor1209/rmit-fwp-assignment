import { IconButton, Stack } from '@mui/material'
import { useState } from 'react'
import EditUserForm from '../Forms/EditUserForm'
import BasicModal from '../UI/BasicModal'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { deleteUser } from '../../data/users'
import { useAuthContext } from '../../hooks/useAuthContext'
import DeleteUserPrompt from './DeleteUserPrompt'

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

  // const getCurrentUser = async () => {
  //   const { data } = await axios.get(
  //     'http://localhost:4000/rest-api/users/current',
  //     {
  //       withCredentials: true,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Credentials': true,
  //         'Content-Type': 'application/json;charset=UTF-8',
  //       },
  //     }
  //   )
  //   return data
  // }

  // const { data } = useQuery('user', getCurrentUser, { staleTime: 120000 })

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
      <BasicModal open={editIsOpen} onClose={handleEditToggle}>
        <EditUserForm handleToggle={handleEditToggle} />
      </BasicModal>
      <BasicModal open={deleteIsOpen} onClose={handleDeleteToggle}>
        <DeleteUserPrompt handleToggle={handleDeleteToggle} />
      </BasicModal>
    </>
  )
}

export default EditUser
