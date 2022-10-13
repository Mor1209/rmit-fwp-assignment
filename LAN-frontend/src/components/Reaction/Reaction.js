import { IconButton } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

function Reaction({
  reaction,
  addReaction,
  reactionMutate,
  commentId,
  userId,
  postId,
}) {
  let buttons = null

  const data = {
    userId: userId,
    postId: postId,
    commentId: commentId,
  }

  if (reaction === null) {
    buttons = (
      <>
        <IconButton
          onClick={() =>
            addReaction({
              ...data,
              reaction: 'like',
            })
          }
        >
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            addReaction({
              ...data,
              reaction: 'dislike',
            })
          }
        >
          <ThumbDownOffAltIcon />
        </IconButton>
      </>
    )
  } else if (reaction?.reaction === 'none') {
    buttons = (
      <>
        <IconButton
          onClick={() =>
            reactionMutate({
              ...data,
              reaction: 'like',
            })
          }
        >
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            reactionMutate({
              ...data,
              reaction: 'dislike',
            })
          }
        >
          <ThumbDownOffAltIcon />
        </IconButton>
      </>
    )
  } else if (reaction?.reaction === 'like') {
    buttons = (
      <>
        <IconButton
          onClick={() =>
            reactionMutate({
              ...data,
              reaction: 'none',
            })
          }
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            reactionMutate({
              ...data,
              reaction: 'dislike',
            })
          }
        >
          <ThumbDownOffAltIcon />
        </IconButton>
      </>
    )
  } else if (reaction?.reaction === 'dislike') {
    buttons = (
      <>
        <IconButton
          onClick={() =>
            reactionMutate({
              ...data,
              reaction: 'like',
            })
          }
        >
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            reactionMutate({
              ...data,
              reaction: 'none',
            })
          }
        >
          <ThumbDownIcon />
        </IconButton>
      </>
    )
  }
  return buttons
}

export default Reaction
