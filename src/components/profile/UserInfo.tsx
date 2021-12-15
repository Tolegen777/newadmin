import { Grid, Typography, Skeleton, Table, TableCell, TableRow, TableBody, Paper } from '@mui/material';
import React from 'react';
import { useGetMyProfileQuery } from '../../redux/services/auth';

const UserInfo: React.FC = () => {
  const { data: profile, isLoading, isError } = useGetMyProfileQuery('user');

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>Пользователь</Typography>
      {isLoading ?
        <Skeleton variant="rectangular" animation="wave" width={210} height={118} />
        :
        <Table>
          {profile?.avatar ?
            <img src={profile.avatar} width="50%" height="50%" />
            :
            <Paper sx={{ backgroundColor: '#C3C3C3', width: '100px', height: '100px', display: 'flex', textAlign: 'center', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ fontSize: '10px' }}>Аватар пользователя</Typography>
            </Paper>
          }
          <TableBody>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>{profile?.firstName} {profile?.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Телефон</TableCell>
              <TableCell>{profile?.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>E-mail</TableCell>
              <TableCell>{profile?.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      }
    </>
  )
}

export default UserInfo
