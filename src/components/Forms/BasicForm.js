import { Box, Typography, Button, IconButton } from '@mui/material'
import FormInputField from './FormInputField'
import { ArrowBack } from '@mui/icons-material'

// A basic form with text input fields and form validation
// requeries to be given the values of react hook form in props validation
// and all details for every input field
const BasicForm = props => {
  // validation from react hook form
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
        borderRadius: '8px',
        border: '1px solid #dadce0',
        backgroundColor: 'white',
      }}
    >
      {props.stepBackHandler && (
        <IconButton
          onClick={props.stepBackHandler}
          sx={{ position: 'absolute' }}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Box sx={{ padding: 6 }}>
        <Typography component="h1" align="center" variant="h4" sx={{ mb: 2 }}>
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
          {props.inputFields}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {props.submitButtonName}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BasicForm
