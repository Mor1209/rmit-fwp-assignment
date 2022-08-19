/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router'
import { getPostById } from '../../data/posts'
import { useEffect, useState } from 'react'
import BannerImage from '../../assets/r.webp'

function Post() {
  const params = useParams()
  const [post, setPost] = useState()

  useEffect(() => {
    setPost(getPostById(params.id))
    console.log(post)
  }, [])

  return (
    <>
      <div
        style={{
          backgroundImage: BannerImage,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1>Post Page {post && post.title}</h1>
      </div>
    </>
  )
}

export default Post
