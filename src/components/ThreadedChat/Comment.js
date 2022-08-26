import { Paper, Avatar, Grid, Typography, Button } from '@mui/material'
import CommentForm from '../Forms/CommentForm'

function Comment(props) {
  const {
    comment,
    selectedComment,
    setSelectedComment,
    addComment,
    postId,
    getReplies,
    loading,
  } = props

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
                {comment.image && (
                  <img
                    src={comment.image}
                    alt="uploadedImage"
                    style={{ display: 'block', height: 100, width: 100 }}
                  />
                )}

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

        {/* display reply form */}
        {selected ? (
          <CommentForm
            submit={addComment}
            parentId={comment.id}
            postId={postId}
            loading={loading}
          />
        ) : null}

        <Grid item>
          {/* redner all the comment replies */}
          {replies !== null &&
            replies.map(replies => {
              return <Comment {...props} key={replies.id} comment={replies} />
            })}
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Comment
