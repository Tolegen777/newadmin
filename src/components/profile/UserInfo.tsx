import { Button, Grid, Skeleton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { IUser } from '../../types/IProfile';
import ImageInput from '../image-input/ImageInput';

type Props = {
  profile: IUser,
  avatar: File | null,
  isLoading: boolean
  onChange: (value: Event) => void
  onDelete: () => void
}

const UserInfo: React.FC<Props> = ({ profile, avatar, isLoading, onChange, onDelete }) => {

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>Пользователь</Typography>
      {isLoading ?
        <Skeleton variant="rectangular" animation="wave" width={210} height={118} />
        :
        <Table>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              {avatar ?
                <img src={URL.createObjectURL(avatar)} width="100px" height="100px" />
                :
                <ImageInput title="Добавить аватарку" handleChange={onChange} height="100px" width="100px" />
              }
            </Grid>
            <Grid item>
              {avatar &&
                <Button variant="outlined" size="small" onClick={onDelete}>Удалить</Button>
              }
            </Grid>
          </Grid>
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
