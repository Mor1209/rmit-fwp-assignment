import { FormControl, TextField, Alert } from '@mui/material'

function PostInputField({ errors, register, label, rows }) {
  return (
    <FormControl fullWidth sx={{ ml: 1 }} variant="standard">
      <TextField
        placeholder="Write down the content"
        multiline
        rows={rows}
        error={!!errors.content}
        {...register(label, {
          required: 'This field is required',
          maxLength: 250,
        })}
      />
      {errors.content && errors.content.type === 'required' && (
        <Alert severity="error">{errors.content.message}</Alert>
      )}
      {errors.content && errors.content.type === 'maxLength' && (
        <Alert severity="error">Max length reached</Alert>
      )}
    </FormControl>
  )
}
export default PostInputField
