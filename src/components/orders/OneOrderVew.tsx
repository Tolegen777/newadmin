import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const OneOrderVew = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#EFF3F9', color: 'black' }}
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate('/app/orders')}
      >
        Назад</Button>
      <Typography>TESTING ONE ORDER</Typography>
    </Box>
  )
}

export default OneOrderVew
