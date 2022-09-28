import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import HeroImg from '../../assets/t.webp'

// Layout for the Application
const Layout = props => {
  return (
    <>
      <CssBaseline />
      {/* Hero image to be displayed as background on every page*/}
      <Box
        sx={{
          textAlign: 'center',
          minHeight: '100vh',
          height: 'auto',
          // height: '100vh'
          backgroundImage: `url(${HeroImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          {props.children}
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
