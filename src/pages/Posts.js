import {
  FormControl,
  InputLabel,
  TextField,
  Input,
  Container,
  Button,
  Box,
} from '@mui/material'

function Posts() {
  return (
    <Container
      sx={{
        height: '100%',
        backgroundColor: 'white',
        border: '2px',
        borderRadius: '25px',
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <h1> Create a Post </h1>
      <FormControl fullWidth sx={{ m: 1 }} variant="contained">
        <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
        <Input>Title</Input>
      </FormControl>
      <FormControl fullWidth sx={{ ml: 1 }} variant="standard">
        <TextField
          placeholder="Write down the content"
          multiline
          rows={10}
          maxRows={4}
        />
      </FormControl>
      <Box m={2} justifyContent={'flex-start'} display={'flex'}>
        <Button variant="contained" sx={{ width: '20%' }}>
          Post
        </Button>
      </Box>
    </Container>
  )
}

export default Posts
