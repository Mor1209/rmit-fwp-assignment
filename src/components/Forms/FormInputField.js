import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material'

const FormInputField = props => {
  const { id, label, register, errors, defaultValue } = props

  return (
    <FormControl error={errors ? true : false} fullWidth sx={{ mt: 1 }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={id}
        label={label}
        defaultValue={defaultValue}
        type={
          id === 'password' || id === 'confirmPassword' ? 'password' : undefined
        }
        {...register(id)}
      />
      <FormHelperText>
        {errors?.message &&
          errors?.message.charAt(0).toUpperCase() + errors?.message.slice(1)}
      </FormHelperText>
    </FormControl>
  )
}

export default FormInputField
