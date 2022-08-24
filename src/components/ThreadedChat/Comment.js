import { Paper, Avatar, Grid, Typography, Button } from '@mui/material'

function Comment({ comment, replies }) {
  return (
    <Paper sx={{ padding: '20px 25px', margin: 2 }} elevation={4}>
      <Grid container spacing={1} display="flex" direction="column">
        <Grid item>
          <Grid container wrap="nowrap" spacing={2} sx={{}}>
            <Grid item>
              <Avatar alt="user" />
            </Grid>
            <Grid item>
              <Typography variant="h6">{comment.user}</Typography>
              <p style={{ margin: 0 }}>{comment.comment}</p>
              <div
                style={{
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                <Button>Reply</Button>
                <Button>Delete</Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {replies &&
            replies.map(replies => {
              return (
                <Comment key={replies.id} comment={replies} replies={null} />
              )
            })}
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Comment
