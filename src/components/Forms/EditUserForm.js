import React from 'react'
import capitalize from '../../helpers/capitalize'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useRegisterValidation } from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'

// Form for editing user details
// default values are set from the current user
const EditUserForm = props => {
  const { user } = useAuthContext()
  const userName = capitalize(user.name)
  const inputFields = [
    { label: 'Name', defaultValue: userName },
    { label: 'Email', defaultValue: user.email },
    { label: 'Password', defaultValue: user.password },
    { label: 'Confirm Password', defaultValue: user.password },
  ]
  const { updateUserDetails } = useUpdateUser()
  const onSubmit = data => {
    if (updateUserDetails(data.name, data.email, data.password)) {
      props.handleToggle()
    }
  }
  const validation = useRegisterValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFields}
      formName={'Edit'}
      submitButtonName="Edit"
    />
  )
}

export default EditUserForm
