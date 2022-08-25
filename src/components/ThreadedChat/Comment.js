import { Paper, Avatar, Grid, Typography, Button } from '@mui/material'
import CommentForm from '../Forms/CommentForm'

function Comment({
  comment,
  selectedComment,
  setSelectedComment,
  addComment,
  postId,
  getReplies,
}) {
  const replies = getReplies(comment.id)

  const selected = selectedComment && selectedComment.id === comment.id

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
                <Button
                  onClick={() => {
                    setSelectedComment({ id: comment.id })
                  }}
                >
                  Reply
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {selected ? (
          <CommentForm
            submit={addComment}
            parentId={comment.id}
            postId={postId}
          />
        ) : null}

        <Grid item>
          {replies !== null &&
            replies.map(replies => {
              return (
                <Comment
                  key={replies.id}
                  comment={replies}
                  getReplies={getReplies}
                  selectedComment={selectedComment}
                  setSelectedComment={setSelectedComment}
                  addComment={addComment}
                  postId={postId}
                />
              )
            })}
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Comment
