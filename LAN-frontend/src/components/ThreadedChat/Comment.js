import { Paper, Grid, Typography, Button } from '@mui/material'
import { getUserById } from '../../data/users'
import CommentForm from '../Forms/CommentForm'
import capitalize from '../../helpers/capitalize'
import UserAvatar from '../UI/UserAvatar'
import { useQuery } from 'react-query'
import axios from 'axios'

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
  const API_PATH = 'http://localhost:4000/api'

  // const fetchComments = async () => {
  //   const { data } = await axios.get(`${API_PATH}/comments/${comment.id}`, {
  //     withCredentials: true,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Credentials': true,
  //       'Content-Type': 'application/json;charset=UTF-8',
  //     },
  //   })

  //   return data.comments
  // }

  const fetchUser = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/rest-api/users/${comment.userId}`,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )

    return data.data.user
  }

  const { data: user } = useQuery('currentUser', fetchUser)

  // const { data: replies } = useQuery('replies', fetchComments)
  // console.log(replies)

  const replies = getReplies(comment.id)
  const selected = selectedComment && selectedComment.id === comment.id

  return (
    <Paper sx={{ padding: '20px 25px', margin: 2 }} elevation={4}>
      <Grid container spacing={1} display="flex" direction="column">
        <Grid item>
          <Grid container wrap="nowrap" spacing={2} sx={{}}>
            <Grid item>
              <UserAvatar name={user?.username} />
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ pb: 0.5 }}>
                {capitalize(user?.username)}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
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
