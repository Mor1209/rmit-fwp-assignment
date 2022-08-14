import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useRegisterValidation } from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'

const EditUserForm = props => {
  const { user } = useAuthContext()
  const userName = user.name
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')
  const inputFields = [
    { label: 'Name', defaultValue: userName },
    { label: 'Email', defaultValue: user.email },
    { label: 'Password', defaultValue: user.password },
    { label: 'Confirm Password', defaultValue: user.password },
  ]
  const { updateUserDetails } = useUpdateUser()
  const onSubmit = data => {
    if (updateUserDetails(data.name, data.email, data.password)) {
      props.onSuccess()
    }
  }
  const validation = useRegisterValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFields}
      formName={'Edit'}
    />
  )
}

export default EditUserForm
