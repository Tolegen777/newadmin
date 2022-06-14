import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import {SelectChangeEvent} from '@mui/material/Select';
import {DialogContentText, ListItemIcon, ListItemText} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useTypedSelector} from '../../store';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
    handleSetCategory(categoryId: number, categoryName: string): void
}

const SelectCategory: React.FC<PropsType> = (props) => {
    const [selectedCategory, setSelectedCategory] = useState<number | string>('')
    const data = useTypedSelector(state => state.product)
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState<number | string>('');
    const [categoryId, setCategoryId] = React.useState<number | string>('')
    const [secondCategoryId, setSecondCategoryId] = React.useState<number | string>('')
    const [categoryValue, setCategoryValue] = React.useState<string>('')

    const handleChange = (event: SelectChangeEvent<typeof age>) => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    // const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    //     if (reason !== 'backdropClick') {
    //         setOpen(false);
    //     }
    // };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSetCategoryId = (id: number, value: string = '', arr: Array<any>) => {
        setSelectedCategory(id)
        setCategoryId(id)

        props.handleSetCategory(id, value)
        if (arr.length === 0) {
            handleClose()
        }
    }

    const handleSetSecondCategoryId = (id: number, value: string = '', arr: Array<any>) => {
        setSelectedCategory(id)
        setSecondCategoryId(id)

        props.handleSetCategory(id, value)
        if (arr.length === 0) {
            handleClose()
        }
    }

    const handleSetThirdCategoryId = (id: number, value: string = '', arr: Array<any>) => {
        setSelectedCategory(id)

        props.handleSetCategory(id, value)
        if (arr.length === 0) {
            handleClose()
        }
    }

    const bottomRef = React.useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

    };

    useEffect(() => {
        scrollToBottom()
    }, [categoryId,secondCategoryId])

    return (
        <div>
            <Button onClick={handleClickOpen} variant='outlined' sx={{m: '8px'}}>
                Выбрать категорию
            </Button>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} maxWidth='lg'>
                <Grid container>
                    <Grid item sm={11}> <DialogTitle>Выбор категории</DialogTitle></Grid>
                    <Grid item sm={1} sx={{marginTop: '15px'}}> <Button variant={"text"}
                                                                        onClick={handleClose}><CloseIcon/></Button></Grid>
                </Grid>

                <DialogContent sx={{width: '1024px', height: '75vh'}}>
                    <div ref={bottomRef}></div>
                    <Grid container columns={3} direction='row' columnGap={1}>
                        <Grid item xs>
                            <DialogContentText>Уровень 1</DialogContentText>
                            <List component="nav" aria-label="secondary mailbox folder">
                                {data.categories && data.categories.map(category => {

                                    return <ListItemButton
                                        key={category.id}
                                        // style = {selectedCategory === category.id ? {color: 'red'} : {color: 'blue'}}
                                        selected={selectedCategory === category.id}
                                        onClick={() => handleSetCategoryId(category.id, category.name, category.children)}

                                    >
                                        <ListItemText primary={category.name}/>
                                        <ListItemIcon sx={{minWidth: 0}}>

                                            <ChevronRightIcon/>

                                        </ListItemIcon>
                                    </ListItemButton>
                                })
                                }
                            </List>
                        </Grid>
                        <Grid xs>
                            <DialogContentText>Уровень 2</DialogContentText>
                            <List component="nav" aria-label="secondary mailbox folder">

                                {data.categories && data.categories.map(category => {

                                    if (category.id === categoryId) {
                                        return data.categories[data.categories.indexOf(category)].children.map((childCategory) => {

                                            return <ListItemButton
                                                key={childCategory.id}
                                                selected={selectedCategory === childCategory.id}
                                                onClick={() => handleSetSecondCategoryId(childCategory.id, childCategory.name, childCategory.children)}
                                            >
                                                <ListItemText primary={childCategory.name}/>
                                                <ListItemIcon sx={{minWidth: 0}}>

                                                    <ChevronRightIcon/>

                                                </ListItemIcon>
                                            </ListItemButton>
                                        })

                                    }
                                })
                                }
                            </List>
                        </Grid>
                        <Grid item xs>
                            <DialogContentText>Уровень 3</DialogContentText>
                            <List component="nav" aria-label="secondary mailbox folder">

                                {data.categories && data.categories.map(category => {

                                    if (category.id === categoryId) {
                                        return data.categories[data.categories.indexOf(category)].children.map((childCategory) => {
                                            if (childCategory.id === secondCategoryId) {

                                                return childCategory.children && childCategory.children.map(secondChild => {


                                                    return <ListItemButton
                                                        key={secondChild.id}
                                                        selected={selectedCategory === secondChild.id}
                                                        onClick={() => handleSetThirdCategoryId(secondChild.id, secondChild.name, secondChild.children)}
                                                    >
                                                        <ListItemText primary={secondChild.name}/>
                                                        <ListItemIcon sx={{minWidth: 0}}>

                                                            <ChevronRightIcon/>

                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                })
                                            }
                                        })

                                    }
                                })
                                }
                            </List>
                        </Grid>
                    </Grid>
                </DialogContent>


            </Dialog>
        </div>
    )
}

export default SelectCategory