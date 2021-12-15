import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Props = {
  id: number
  image: string
  title: string
  date?: Date
}

const OrderCard: React.FC<Props> = ({ id, image, title, date = "24 Августа 2021" }) => {
  const navigate = useNavigate();

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: '10px', marginTop: '15px', padding: '10px', cursor: 'pointer' }}
      onClick={() => navigate("one/1")}
    >
      <Grid container spacing={1}>
        <Grid item sm={3} xs={3} lg={3}>
          <img
            src={`https://file.adu24.com/${image}`}
            alt=""
            style={{ height: '75px', width: 'auto', borderRadius: '10px' }}
          />
        </Grid>
        <Grid item sm={9} xs={9} lg={9}>
          <Typography sx={{ fontWeight: 600 }}>#{id}</Typography>
          <Typography>{title}</Typography>
          <Typography sx={{ color: '#999999' }}>{date}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default OrderCard
