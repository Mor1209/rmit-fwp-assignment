import { useParams } from 'react-router'
function UserPost() {
  const params = useParams()

  return <h1>All User Posts Page: {params.user}</h1>
}

export default UserPost
