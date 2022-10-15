import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useCommentValidation } from '../../hooks/usePostValidation'
import { useAuthContext } from '../../hooks/useAuthContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'

// Form for adding comments to posts
function CommentForm({ type, submit, postId, parentId, loading }) {
  const { user } = useAuthContext()
  const { errors, submitHandler, register, reset, setValue, watch } =
    useCommentValidation()

  const onSubmit = data => {
    submit(data, postId, parentId, user.id, reset)
    setImage('')
  }

  useEffect(() => {
    register('comment')
  }, [register])

  const onCommentChange = currentValue => {
    setValue('comment', currentValue)
  }

  const comment = watch('comment')

  const [image, setImage] = useState('')
  return (
    <Box component="form" onSubmit={submitHandler(onSubmit)}>
      <p className="Error" style={{ color: 'red' }}>
        {errors.content && errors['content'].message}
      </p>
      <ReactQuill
        theme="snow"
        value={comment}
        onChange={onCommentChange}
        placeholder="Write down the content"
        style={{ height: '180px', marginTop: '10px' }}
      />

      {/* <FormInputField
        id="comment"
        name="comment"
        register={register}
        errors={errors['comment']}
        placeholder="Write down your comment"
        multiline
        rows={5}
      /> */}

      {/* display uploaded image under the form */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="userimage"
          style={{
            height: 'auto',
            maxWidth: '130px',
            verticalAlign: 'middle',
            width: '100%',
            display: 'flex',
            padding: 10,
            margin: 10,
            borderRadius: '25px',
            backgroundColor: 'grey',
          }}
        />
      )}

      <Stack
        mt={6}
        ml={2}
        mr={2}
        direction="row"
        justifyContent="space-between"
      >
        <FormControl
          error={errors['image'] ? true : false}
          fullWidth
          sx={{ mt: 1 }}
        >
          <Input
            type="file"
            name="image"
            inputProps={{ accept: 'image/*' }}
            {...register('image')}
            onChange={e => setImage(e.target.files[0])}
            disabled={loading}
            disableUnderline={true}
            errors={errors['image']}
          />
          <FormHelperText>
            {errors['image']?.message &&
              errors['image']?.message.charAt(0).toUpperCase() +
                errors['image']?.message.slice(1)}
          </FormHelperText>
        </FormControl>

        <Button
          variant={'contained'}
          sx={{ width: '20%' }}
          disabled={loading}
          type="submit"
        >
          {type === 'comment' ? 'Add Comment' : 'Reply'}
        </Button>
      </Stack>
    </Box>
  )
}

export default CommentForm
