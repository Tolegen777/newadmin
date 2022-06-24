import React from 'react'
import {Grid, Paper, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    id: number
    totalPrice: string | number
    products?: any
    date?: Date,
    createdAt: string
    orderCount?: number
    key: any
}

const OrderCard: React.FC<Props> = ({id, totalPrice, createdAt, key}) => {
    const navigate = useNavigate();

    return (
        <Paper
            variant="outlined"
            sx={{borderRadius: '10px', marginTop: '15px', padding: '10px', cursor: 'pointer'}}
            onClick={() => navigate(`one/${id}`)}
            key={key}
        >
            <Grid container spacing={1}>
                <Grid item sm={10} xs={10} lg={11}>
                    <Typography sx={{fontWeight: 600}}>#{id}</Typography>
                    <Typography sx={{color: '#999999'}}>Сумма: {totalPrice} Tг</Typography>
                    <Typography sx={{color: '#999999'}}>Дата
                        создания: {createdAt.slice(0, 10).split('-').reverse().join('-')}</Typography>
                </Grid>
                <Grid item sm={2} xs={2} lg={1}
                      sx={{alignSelf: "center"}}
                ><ArrowForwardIosIcon
                    sx={{color: '#999999', fontSize: 'large'}}/></Grid>
            </Grid>
        </Paper>
    )
}

export default OrderCard