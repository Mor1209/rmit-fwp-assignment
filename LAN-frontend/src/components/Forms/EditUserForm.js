import React from 'react'
import capitalize from '../../helpers/capitalize'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useUpdateValidation } from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'

// Form for editing user details
// default values are set from the current user
const EditUserForm = ({ handleToggle }) => {
  const { user } = useAuthContext()
  const username = capitalize(user.username)
  const inputFields = [
    { label: 'Username', defaultValue: username },
    { label: 'Email', defaultValue: user.email },
  ]
  const { updateMutation } = useUpdateUser({ handleToggle })
  const onSubmit = data => {
    updateMutation.mutate(data)
  }
  const validation = useUpdateValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFields}
      formName={'Edit'}
      submitButtonName="Edit"
      isLoading={updateMutation.isLoading}
    />
  )
}

export default EditUserForm
