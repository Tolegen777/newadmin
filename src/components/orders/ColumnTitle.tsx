import { Paper, Typography } from '@mui/material'
import React from 'react'

type Props = {
  title: string;
  amount: number;
  color?: string;
}

const ColumnTitle: React.FC<Props> = ({ title, amount, color }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between ' }}>
      <Typography color={color || ""} sx={{ fontSize: '20px', fontWeight: 600 }}>{title}</Typography>
      <Paper variant="outlined" sx={{ padding: '5px' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{amount}</Typography>
      </Paper>
    </div>
  )
}

export default ColumnTitle
