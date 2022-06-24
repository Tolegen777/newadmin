import {Box, Paper, Typography, useMediaQuery, useTheme} from '@mui/material'
import React from 'react'

type Props = {
  title: string;
  amount: number;
  color?: string;
}

const ColumnTitle: React.FC<Props> = ({ title, amount, color }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box justifyContent={"space-between"} display={isMobile?"block":"flex"}>
      <Typography color={color || ""} sx={{ fontSize: '19px', fontWeight: 700 }}>{title}</Typography>
      <Paper variant="outlined" sx={{ padding: '5px' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{amount}</Typography>
      </Paper>
    </Box>
  )
}

export default ColumnTitle
