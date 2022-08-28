import { Avatar } from '@mui/material'
import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// User avater which displayes initials of the user name
const UserAvatar = props => {
  const authCtx = useAuthContext()

  let name = props.name
  if (!name) {
    name = authCtx.user.name
  }

  const nameSplit = name.split(' ')
  let nameInitials = nameSplit.at(0).charAt(0).toUpperCase()
  nameInitials +=
    nameSplit.length > 1 ? nameSplit?.at(1)?.charAt(0)?.toUpperCase() : ''

  const avatarProps = {
    bgcolor: 'gold',
    border: props.border,
    width: props.size,
    height: props.size,
    fontSize: props.size * 0.78,
  }

  if (nameInitials.length > 1) {
    avatarProps.fontSize = props.size / 2
  }

  return <Avatar sx={{ ...avatarProps }}>{nameInitials}</Avatar>
}

export default UserAvatar
