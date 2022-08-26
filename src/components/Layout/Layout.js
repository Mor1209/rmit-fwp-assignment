import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import HeroImg from '../../assets/t.webp'

const Layout = props => {
  return (
    <>
      <CssBaseline />
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
