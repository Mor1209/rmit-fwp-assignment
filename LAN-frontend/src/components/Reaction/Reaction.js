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

  const initButtons = (
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

  const noneButtons = (
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

  const likeButtons = (
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

  const dislikeButtons = (
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

  const chooseButtons = (reaction, condition = true) => {
    if (condition) {
      if (reaction === 'none') {
        buttons = noneButtons
      } else if (reaction === 'like') {
        buttons = likeButtons
      } else if (reaction === 'dislike') {
        buttons = dislikeButtons
      }
    } else {
      buttons = noneButtons
    }
  }

  if (reaction === null) {
    buttons = initButtons
  } else {
    if (reaction?.commentId === null) {
      chooseButtons(reaction?.reaction)
    } else {
      chooseButtons(reaction?.reaction, reaction?.commentId === commentId)
    }
  }

  return buttons
}

export default Reaction
