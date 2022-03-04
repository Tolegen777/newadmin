import { Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useTypedSelector } from '../../store';

const ShopInfo: React.FC = () => {
  const { user } = useTypedSelector(state => state.auth)

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>Бизнес</Typography>
      <Table>
        {user?.shops[0].logo ?
          <img src={user.shops[0].logo} width="50%" height="50%" />
          :
          <Paper elevation={0} sx={{ height: "100px", width: "100px", border: '1px dashed #999999', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#999999' }}>
            Нет лого магазина
          </Paper>
          // <ImageInput disabled title="Нет лого магазина" height="100px" width="100px" />
        }
        <TableBody>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>{user?.shops[0].name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>БИН/ИИН</TableCell>
            <TableCell>{user?.shops[0].bin_iin}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Адрес</TableCell>
            <TableCell>{user?.shops[0].legalAddress}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell>{user?.shops[0].shop_type}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default ShopInfo
