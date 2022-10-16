/**
 *  @jest-environment jsdom
 */

import React from 'react'
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react'
import AllPosts from '../pages/posts/AllPosts'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import CreatePost from '../pages/posts/CreatePost'
import Post from '../pages/posts/Post'
const queryClient = new QueryClient()

describe('Post Tests', () => {
  afterEach(() => cleanup())

  it('render all posts in the all posts page', async () => {
    // console.log(posts)
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <AllPosts test={true} />
        </Router>
      </QueryClientProvider>
    )

    await waitFor(() => {
      // get content data
      screen.getByText('hello world my day')
    })
  }, 30000)

  it('give post form invalid values', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CreatePost />
        </Router>
      </QueryClientProvider>
    )

    // make sure the its in the right page
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: '' },
    })

    const button = screen.getByText('Post')

    await act(async () => {
      fireEvent.click(button)
    })

    // error messages for form validation after submit invalid input
    expect(
      screen.getByText('Title must be at least 1 characters')
    ).toBeInTheDocument()
    expect(screen.getByText('content is a required field')).toBeInTheDocument()
  })

  it('render post page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Post test={true} />
        </Router>
      </QueryClientProvider>
    )
    await waitFor(() => {
      // get post content data, title and content
      screen.getByText('reactjs is the best')
      screen.getByText('Unit test')
    })
  })
})

describe('post reaction tests', () => {
  it('render post page with the correct reaction', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Post test={true} />
        </Router>
      </QueryClientProvider>
    )

    // find the thumbup icon (liked the post)
    const liked = screen.getByTestId('ThumbUpIcon')
    expect(liked).toBeInTheDocument()
  })

  it('unlike the post to default reaction', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Post test={true} />
        </Router>
      </QueryClientProvider>
    )

    await act(async () => {
      // click the liked button
      const element = screen.getByTestId('liked-button')
      fireEvent.click(element)
    })

    // after click the liked button, the page should display another button indicate
    // that the user is no longer like the post anymore
    const thumUpAlt = screen.getByTestId('ThumbUpOffAltIcon')
    expect(thumUpAlt).toBeInTheDocument()
  })
}, 30000)
