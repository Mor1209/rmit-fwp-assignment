import {
  FormControl,
  InputLabel,
  TextField,
  Input,
  Container,
  Button,
  Box,
  Alert,
} from '@mui/material'

import { createPost } from '../../data/posts'
import { getUser } from '../../data/users'
import { useNotificationContext } from '../../hooks/useNotificationContext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function CreatePost() {
  const { sendNotification } = useNotificationContext()
  const [loading, setLoading] = useState(false)
  const author = getUser()
  const navigate = useNavigate()

  const onSubmit = (data, e) => {
    setLoading(true)
    const post = {
      title: data.title,
      content: data.content,
      author: author.name,
    }
    createPost(post)
    setLoading(false)
    sendNotification('success', 'Post created', false)
    navigate('/posts')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Container
      sx={{
        height: '100%',
        backgroundColor: 'white',
        border: '2px',
        borderRadius: '25px',
        padding: '10px',
        width: '50%',
      }}
    >
      <h1> Create a Post </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ m: 1 }}>
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
          {errors.title && (
            <Alert severity="error">{errors.title.message}</Alert>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ ml: 1 }} variant="standard">
          <TextField
            placeholder="Write down the content"
            multiline
            rows={10}
            error={!!errors.content}
            {...register('content', {
              required: 'This field is required',
              maxLength: 250,
            })}
          />
          {errors.content && errors.content.type === 'required' && (
            <Alert severity="error">{errors.content.message}</Alert>
          )}
          {errors.content && errors.content.type === 'maxLength' && (
            <Alert severity="error">Max length of a post reached</Alert>
          )}
        </FormControl>
        <Box m={2} justifyContent={'space-between'} display={'flex'}>
          <input type="file" id="myfile" name="myfile" />
          <Button
            variant={'contained'}
            sx={{ width: '20%' }}
            type="submit"
            disabled={loading}
          >
            Post
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default CreatePost
