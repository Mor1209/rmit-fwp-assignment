import { Box, Typography, Button } from '@mui/material'
import FormInputField from './FormInputField'

const BasicForm = props => {
  const { errors, submitHandler, register } = props.validation

  const toCamelCase = str =>
    str
      .toLowerCase()
      .split(' ')
      .map((subStr, idx) =>
        idx !== 0 ? subStr.charAt(0).toUpperCase() + subStr.slice(1) : subStr
      )
      ?.join('')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid #dadce0',
        padding: 6,
        backgroundColor: 'white',
      }}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        {props.formName}
      </Typography>
      {props.children}
      <Box component="form" onSubmit={submitHandler}>
        {props.inputFieldLabels.map(inputField => {
          const id = toCamelCase(inputField.label)
          return (
            <FormInputField
              errors={errors[id]}
              register={register}
              id={id}
              key={id}
              label={inputField.label}
              defaultValue={inputField.defaultValue}
            />
          )
        })}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {props.formName}
        </Button>
      </Box>
    </Box>
  )
}

export default BasicForm
