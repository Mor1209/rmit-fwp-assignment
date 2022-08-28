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

export default function CreatePostForm({
  onSubmit,
  loading,
  formName,
  defaultValue,
}) {
  const { errors, submitHandler, register } = usePostValidation()

  const [image, setImage] = useState('')

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h3">{formName}</Typography>
        <Box component="form" onSubmit={submitHandler(onSubmit)}>
          <FormInputField
            id="title"
            name="title"
            register={register}
            errors={errors['title']}
            label="Title"
            variant="standard"
            defaultValue={defaultValue?.title}
          />
          <FormInputField
            id="content"
            name="content"
            register={register}
            errors={errors['content']}
            placeholder="Write down the content"
            multiline
            defaultValue={defaultValue?.content}
            rows={10}
          />

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

          <Stack m={2} direction="row" justifyContent="space-between">
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
