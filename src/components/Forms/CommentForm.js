import { FormControl, TextField, Button, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
function CommentForm({ type, submit, postId, parentId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(data => submit(data, postId, parentId))}>
      <FormControl fullWidth sx={{ marginTop: 1 }} variant="standard">
        <TextField
          placeholder="Write down the content"
          multiline
          rows={2}
          error={!!errors.content}
          {...register('comment', {
            required: 'This field is required',
            maxLength: 250,
          })}
        />
        {errors.content && errors.content.type === 'required' && (
          <Alert severity="error">{errors.content.message}</Alert>
        )}
        {errors.content && errors.content.type === 'maxLength' && (
          <Alert severity="error">Max length of a comment reached</Alert>
        )}
      </FormControl>
      <Button
        variant={'contained'}
        sx={{ width: '20%', margin: 2 }}
        type="submit"
      >
        {type === 'comment' ? 'Add Comment' : 'Reply'}
      </Button>
    </form>
  )
}

export default CommentForm
