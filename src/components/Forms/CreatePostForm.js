import { useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Alert,
  Button,
  Stack,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import PostInputField from './PostInputField'
import FormInputField from './FormInputField'

export default function CreatePostForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [image, setImage] = useState('')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
        <Input
          error={!!errors.title}
          {...register('title', {
            required: 'Title is required',
            maxLength: 20,
            min: 1,
          })}
        >
          Title
        </Input>
        {errors.title && <Alert severity="error">{errors.title.message}</Alert>}
      </FormControl> */}
      <FormInputField
        id="2"
        register={register}
        errors={errors}
        label="Title"
        variant="standard"
      />
      <FormInputField
        id="1"
        register={register}
        errors={errors}
        placeholder="Write down the content"
        multiline
        rows={10}
      />

      {/* <PostInputField
        errors={errors}
        label={'content'}
        rows={10}
        register={register}
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

      <Stack m={2} direction="row" justifyContent="space-between">
        <input
          type="file"
          name="image"
          accept="image/*"
          {...register('image')}
          onClick={e => setImage(e.target.files[0])}
          disabled={loading}
        />
        <Button
          variant={'contained'}
          sx={{ width: '20%' }}
          disabled={loading}
          type="submit"
        >
          Post
        </Button>
      </Stack>
    </form>
  )
}
