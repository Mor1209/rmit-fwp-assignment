import { Box, Container, CssBaseline } from '@mui/material'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = props => {
  return (
    <>
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar />
        <CssBaseline />
        {props.children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
