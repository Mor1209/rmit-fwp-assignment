import { useState } from 'react'
import {
  Box,
  FormControl,
  Input,
  Button,
  Stack,
  FormHelperText,
  Paper,
  Typography,
} from '@mui/material'
import FormInputField from './FormInputField'
import { usePostValidation } from '../../hooks/usePostValidation'
import { Container } from '@mui/system'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'

// Multi-purpose form for creating posts and editing them
export default function CreatePostForm({
  onSubmit,
  loading,
  formName,
  defaultValue,
}) {
  const { errors, submitHandler, register, setValue, watch } =
    usePostValidation()

  const [image, setImage] = useState('')

  useEffect(() => {
    register('content')
  }, [register])

  const onPostContentChange = currentValue => {
    setValue('content', currentValue)
  }

  const content = watch('content')

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h3">{formName}</Typography>
        <Box component="form" onSubmit={submitHandler(onSubmit)}>
          <FormInputField
            id="title"
            name="title"
            data-testid={'title'}
            register={register}
            errors={errors['title']}
            label="Title"
            variant="standard"
            defaultValue={defaultValue?.title}
          />

          <p className="Error" style={{ color: 'red' }}>
            {errors.content && errors['content'].message}
          </p>
          <ReactQuill
            theme="snow"
            value={content}
            role={'content'}
            data-testid="custom-element"
            onChange={onPostContentChange}
            placeholder="Write down the content"
            style={{ height: '180px', marginTop: '10px' }}
          />

          {/* <FormInputField
            id="content"
            name="content"
            register={register}
            errors={errors['content']}
            placeholder="Write down the content"
            multiline
            defaultValue={defaultValue?.content}
            rows={10}
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
              Post
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}
