import React from 'react'
import {Grid, Paper, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

type Props = {
    id?: number | string
    image?: string
    productCount?: number
    price?: number
    date?: Date
    name: string
}

const OrderProductCard: React.FC<Props> = ({id, image, productCount, price, name, date = "24 Августа 2021"}) => {
    const navigate = useNavigate();

    return (
        <Paper
            variant="outlined"
            sx={{borderRadius: '10px', marginTop: '15px', padding: '10px'}}

        >
            <Grid container spacing={10}>
                <Grid item sm={2} xs={2} lg={2}>
                    <img
                        src={`https://file.adu24.com/${image}`}
                        alt=""
                        style={{height: '75px', width: 'auto', borderRadius: '10px'}}
                    />
                </Grid>
                <Grid item sm={8} xs={8} lg={8}>
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