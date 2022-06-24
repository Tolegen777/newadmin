import {
    Box,
    Button,
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography, useMediaQuery,
    useTheme
} from '@mui/material';
import React from 'react';
import {IUser} from '../../types/IProfile';
import ImageInput from '../image-input/ImageInput';

type Props = {
    profile: IUser,
    avatar: File | null,
    isLoading: boolean
    onChange: (value: Event) => void
    onDelete: () => void
}

const UserInfo: React.FC<Props> = ({profile, avatar, isLoading, onChange, onDelete}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Typography sx={{fontSize: '20px', fontWeight: 700, marginBottom: '15px'}}>Пользователь</Typography>
            <Table>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        {avatar ?
                            <img src={URL.createObjectURL(avatar)} width="132px" height="100px"/>
                            :
                            <>
                                {!isMobile&&<Paper elevation={0} sx={{
                                    height: "132px",
                                    width: "100px",
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    color: '#999999'
                                }}>

                                </Paper>}
                            </>

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

        </>
    )
}

export default UserInfo
