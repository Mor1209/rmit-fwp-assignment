// This idea and some of it's code has been taken from the Week03.Lectorial.code/example10
///////////////////////////////////////////////////////////////////////////////////////////
import { deletePostbyUserId } from './posts'
const USERS_KEY = 'users'
const USER_KEY = 'user'

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
const initUsers = () => {
  // Stop if data is already initialised.
  if (getUsers()) return

  // User data is hard-coded, passwords are in plain-text.
  // cannot use at the moment without the registering
  // the secret token
  const users = [
    {
      name: 'moritz',
      email: 'mohauptmann@gmail.com',
      password: '!Pp123456789',
      userId: 1,
      created: '2022-08-14T01:29:24.478Z',
    },
    {
      name: 'm',
      email: 'm@gmail.com',
      password: 'Qq!12345678',
      userId: 2,
      created: '2022-08-14T01:29:24.478Z',
    },
  ]

  // Set data into local storage.
  setUsers(users)
}

const addUser = (name, email, password, secretkey) => {
  console.log('addUser')
  console.log(name)
  console.log(email)
  name = name.toLowerCase()
  email = email.toLowerCase()

  if (userExists(email)) return

  const created = new Date().toISOString()
  const users = getUsers()
  const userId = users.at(-1).userId + 1
  const user = { name, email, password, created, secretkey, userId }

  users.push(user)
  setUsers(users)

  return setUser(user)
}

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY))

const setUsers = users => localStorage.setItem(USERS_KEY, JSON.stringify(users))

// NOTE: In this example the login is also persistent as it is stored in local storage.
const verifyUser = (email, password) => {
  const users = getUsers()
  const verifiedUser = users.find(
    user => email === user.email && password === user.password
  )

  if (!verifiedUser) return

  setUser(verifiedUser)

  return verifiedUser
}

const userExists = email => {
  const users = getUsers()

  return users?.some(user => email === user.email)
}

const setUser = user => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

const getUser = () => JSON.parse(localStorage.getItem(USER_KEY))

const updateUser = (name, email, password) => {
  name = name.toLowerCase()
  email = email.toLowerCase()
  const user = getUser()

  if (userExists(email) && user.email !== email) return

  deleteUser()

  const userUpdate = { ...user, name, email, password }
  const users = getUsers()
  users.push(userUpdate)
  setUsers(users)

  return setUser(userUpdate)
}

const deleteUser = () => {
  const { email, userId } = getUser()
  const users = getUsers()

  const usersUpdate = users.filter(user => user.email !== email)
  if (!deletePostbyUserId(userId)) return
  setUsers(usersUpdate)
}

const removeUser = () => localStorage.removeItem(USER_KEY)

export {
  initUsers,
  addUser,
  verifyUser,
  getUser,
  updateUser,
  removeUser,
  deleteUser,
  userExists,
}
