import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = props => {
  return (
    <>
      <Box sx={{ minHeight: '100vh' }}>
        <CssBaseline />
        <Header />
        {props.children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
