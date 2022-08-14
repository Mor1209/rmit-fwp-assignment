import { Box, Modal, Paper, Stack } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const BasicModal = props => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: '20vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '8px',
          }}
        >
          {props.children}
        </Box>
      </Container>
    </Modal>
  )
}

export default BasicModal
