import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    id?: number | string
    image?: string
    productCount?: number
    price?: number
    date?: Date
}

const OrderProductCard: React.FC<Props> = ({ id, image, productCount,price, date = "24 Августа 2021" }) => {
    const navigate = useNavigate();

    return (
        <Paper
            variant="outlined"
            sx={{ borderRadius: '10px', marginTop: '15px', padding: '10px', cursor: 'pointer' }}
            onClick={() => navigate(`one/${id}`)}
        >
            <Grid container spacing={1}>
                <Grid item sm={4} xs={4} lg={4}>
                    <img
                        src={`https://file.adu24.com/${image}`}
                        alt=""
                        style={{ height: '75px', width: 'auto', borderRadius: '10px' }}
                    />
                </Grid>
                <Grid item sm={7} xs={7} lg={7}>
                    <Typography sx={{ fontWeight: 600 }}>#{id} </Typography>
                    <Typography sx={{ color: '#999999' }}>{productCount}</Typography>
                    <Typography sx={{ color: '#999999' }}>{price}</Typography>
                    <Typography sx={{ color: '#999999' }}>{date}</Typography>
                </Grid>
                <Grid item container rowSpacing = {1} sm={1} xs={1} lg={1} sx = {{padding: '1px auto'}}>
                    <ArrowForwardIosIcon sx={{marginTop: '150%', color: '#999999', fontSize:'small'}}/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default OrderProductCard