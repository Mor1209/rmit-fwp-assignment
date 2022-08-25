/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
// import BannerImage from '../../assets/r.webp'
import { Container, Typography } from '@mui/material'
import BannerImage from '../../components/Layout/BannerImage'
import Comment from '../../components/ThreadedChat/Comment'
import CommentForm from '../../components/Forms/CommentForm'
import { createComment, getPostById } from '../../data/posts'

function Post() {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [selectedComment, setSelectedComment] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const { post, comments } = getPostById(params.id)
    setPost(post)
    setComments(comments)
  }, [])

  const addComment = (data, postId, parentId) => {
    const newComment = createComment(data, postId, parentId)
    setComments([...comments, newComment])
    setSelectedComment(null)
  }

  const getCommentReplies = id => {
    return comments.filter(comment => comment.parentId === id)
  }

  return (
    <>
      <BannerImage />
      <Container
        sx={{
          color: 'white',
          textAlign: 'start',
          minHeight: '300px',
        }}
      >
        {post && (
          <>
            <Typography m={2} variant={'h3'}>
              {post.title}
            </Typography>
            <p>{post.content}</p>
          </>
        )}
      </Container>
      <Container
        sx={{
          color: 'black',
          textAlign: 'start',
          backgroundColor: 'white',
          minHeight: '200px',
          marginBottom: '3rem',
          borderRadius: '25px',
        }}
      >
        <Typography variant={'h5'} sx={{ padding: 2 }}>
          Comments
        </Typography>

        <CommentForm
          type={'comment'}
          submit={addComment}
          postId={post?.id}
          parentId={null}
        />

        <hr />
        {comments &&
          comments.map(comment => {
            if (comment.parentId === null)
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  selectedComment={selectedComment}
                  setSelectedComment={setSelectedComment}
                  addComment={addComment}
                  postId={post?.id}
                  getReplies={getCommentReplies}
                />
              )
            return null
          })}
      </Container>
    </>
  )
}

export default Post
