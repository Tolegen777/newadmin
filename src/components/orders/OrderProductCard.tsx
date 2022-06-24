import React from 'react'
import {Grid, Paper, Typography} from '@mui/material'

type Props = {
    id?: number | string
    image?: string
    productCount?: number
    price?: number
    date?: Date
    name: string
}

const OrderProductCard: React.FC<Props> = ({id, image, productCount, price, name}) => {

    return (
        <Paper
            variant="outlined"
            sx={{borderRadius: '10px', marginTop: '15px', padding: '10px'}}
        >
            <Grid container spacing={1}>
                <Grid item sm={4} xs={5} lg={4}>
                    <img
                        src={`https://file.adu24.com/${image}`}
                        alt=""
                        style={{height: '75px', width: 'auto', borderRadius: '10px'}}
                    />
                </Grid>
                <Grid item sm={7} xs={7} lg={7}>
                    <Typography sx={{fontWeight: 600}}>Номер продукта: #{id} </Typography>
                    <Typography sx={{color: '#999999'}}>Название: {name}</Typography>
                    <Typography sx={{color: '#999999'}}>Количество: {productCount}</Typography>
                    <Typography sx={{color: '#999999'}}>Сумма: {price}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default OrderProductCard