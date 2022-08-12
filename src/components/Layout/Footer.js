import { Button, Typography } from '@mui/material'
function Footer() {
  const links = ['Terms', 'Privacy Policy', 'Contact']
  return (
    <footer className="footer">
      <Typography
        sx={{
          marginLeft: '10%',
          fontWeight: 'bold',
          fontSize: '1rem',
          marginRight: '5%',
        }}
      >
        &copy; Copyright By Loop Agile Now
      </Typography>
      {/* <div className="bottomLinks"> */}
      {links.map(page => (
        <Button key={page} sx={{ color: 'black', marginRight: '30px' }}>
          {page}
        </Button>
      ))}
      {/* </div> */}
    </footer>
  )
}

export default Footer
