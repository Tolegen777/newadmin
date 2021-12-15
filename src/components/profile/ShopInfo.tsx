import React from 'react'
import { Grid, Typography, Paper, Skeleton, Table, TableCell, TableRow, TableBody } from '@mui/material';
import { useGetMyShopQuery } from '../../redux/services/auth';

const ShopInfo = () => {
  const { data: shop, isLoading, isError } = useGetMyShopQuery('shop');

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>Бизнес</Typography>
      {isLoading ?
        <Skeleton variant="rectangular" animation="wave" width={210} height={118} />
        :
        <Table>
          {(!isError && shop) &&
            <>
              {shop[0].logo ?
                <img src={shop[0].logo} width="50%" height="50%" />
                :
                <Paper sx={{ backgroundColor: '#C3C3C3', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ fontSize: '10px' }}>Лого магазина</Typography>
                </Paper>
              }
              <TableBody>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>{shop[0].name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>БИН/ИИН</TableCell>
                  <TableCell>{shop[0].bin_iin}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Адрес</TableCell>
                  <TableCell>{shop[0].legalAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Статус</TableCell>
                  <TableCell>{shop[0].shop_type}</TableCell>
                </TableRow>
              </TableBody>
            </>
          }
        </Table>
      }
    </>
  )
}

export default ShopInfo
