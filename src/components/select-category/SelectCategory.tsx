import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DialogContentText, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTypedSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/product/product.action';
import { useGetCategoriesQuery } from '../../store/rtk-api/baseEndpoints';

const SelectCategory = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetCategoriesQuery('categories');

  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant='outlined' sx={{ m: '8px' }}>
        Выбрать категорию
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle>Выбор категории</DialogTitle>
        <DialogContent sx={{ width: '1024px', height: '75vh' }}>
          <Grid container columns={3} direction='row' columnGap={1}>
            <Grid item xs>
              <DialogContentText>Уровень 1</DialogContentText>
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                  selected={true}
                >
                  <ListItemText primary="Trash" />
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  selected={false}
                >
                  <ListItemText primary="Spam" />
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            </Grid>
            <Grid xs>
              <DialogContentText>Уровень 2</DialogContentText>
            </Grid>
            <Grid item xs>
              <DialogContentText>Уровень 3</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color='warning'>Отменить</Button>
          <Button onClick={handleClose} color='success'>Ok</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
}

export default SelectCategory