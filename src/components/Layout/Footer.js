import { Container, Box } from '@mui/material';
function Footer() {
  return (
    <footer className="footer">
      <Box sx={{ border: 1, bottom: 0 }}>
        <Container>
          Copyright &copy; 2022 <b> Loop Agile </b> RMIT
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
