/**
 *  @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Register from '../pages/Register'
import Login from '../pages/Login'
import UserProfile from '../components/UserProfile/UserProfile'

const queryClient = new QueryClient()
describe('User Tests', () => {
  afterEach(() => cleanup())

  it('user login form validation', async () => {
    // console.log(posts)
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Login />
        </Router>
      </QueryClientProvider>
    )

    // get the login page's heading
    screen.getByText('Login')

    const button = screen.getByText('Next')
    await act(async () => {
      fireEvent.click(button)
    })

    // email error
    screen.getByText('Email is a required field')

    // password error
    screen.getByText('Password must be at least 8 characters')
  }, 30000)

  it('submit empty form for register page', async () => {
    // console.log(posts)
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>
    )

    // get the reigster page's heading
    screen.getByText('Register')

    const button = screen.getByText('Next')
    await act(async () => {
      fireEvent.click(button)
    })

    // user name error
    screen.getByText('Username must be at least 3 characters')

    //email error
    screen.getByText('Email is a required field')

    // password error
    screen.getByText('Password must be at least 8 characters')
  }, 30000)

  it('register with valid inputs', async () => {
    // console.log(posts)
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>
    )

    // get the reigster page's heading
    screen.getByText('Register')

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'test' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@gmail.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Qq!123456' },
    })
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Qq!123456' },
    })

    const button = screen.getByText('Next')
    await act(async () => {
      fireEvent.click(button)
    })

    // if user give valid input then the form should not display any error messages
    expect(
      screen.queryByText('Username must be at least 3 characters')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Email is a required field')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Password must be at least 8 characters')
    ).not.toBeInTheDocument()
  }, 30000)

  // it('render user profile page', async () => {
  //   // console.log(posts)
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Router>
  //         <UserProfile test={true} />
  //       </Router>
  //     </QueryClientProvider>
  //   )

  //   // profile page should show their name and email
  //   screen.getByText('Test')
  //   screen.getByText('test@gmail.com')
  // }, 30000)
})
