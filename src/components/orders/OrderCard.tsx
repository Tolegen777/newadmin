import React from 'react'
import {Paper, Grid, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


type Props = {
    id: number
    totalPrice: string | number
    products?: any
    date?: Date,
    orderCount?: number
}

const OrderCard: React.FC<Props> = ({id, totalPrice, products = [], orderCount = 1, date = "24 Августа 2021"}) => {
    const navigate = useNavigate();

    return (
        <Paper
            variant="outlined"
            sx={{borderRadius: '10px', marginTop: '15px', padding: '10px', cursor: 'pointer'}}
            onClick={() => navigate(`one/${id}`)}
        >
            <Grid container spacing={1}>

                <Grid item sm={11} xs={11} lg={11}>
                    <Typography sx={{fontWeight: 600}}>#{id}</Typography>
                    <Typography sx={{color: '#999999', textTransform: "uppercase"}}>Сумма: {totalPrice} T</Typography>
                    <Typography sx={{color: '#999999'}}>{date}</Typography>
                </Grid>
                <Grid item sm={1} xs={1} lg={1}><ArrowForwardIosIcon
                    sx={{marginTop: '150%', color: '#999999', fontSize: 'small'}}/></Grid>
            </Grid>
        </Paper>
    )
}

export default OrderCard