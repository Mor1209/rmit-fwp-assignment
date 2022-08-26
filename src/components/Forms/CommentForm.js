import { FormControl, TextField, Button, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'

function CommentForm({ type, submit, postId, parentId, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(data => submit(data, postId, parentId, reset))}
    >
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
        {errors.comment && errors.comment.type === 'required' && (
          <Alert severity="error">{errors.comment.message}</Alert>
        )}
        {errors.comment && errors.comment.type === 'maxLength' && (
          <Alert severity="error">Max length of a comment reached</Alert>
        )}
      </FormControl>
      <Button
        variant={'contained'}
        sx={{ width: '20%', margin: 2 }}
        type="submit"
        disabled={loading}
      >
        {type === 'comment' ? 'Add Comment' : 'Reply'}
      </Button>
      <input
        type="file"
        name="image"
        accept="image/*"
        {...register('image')}
        disabled={loading}
      />
    </form>
  )
}

export default CommentForm
