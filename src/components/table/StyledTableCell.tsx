import {TableCell, tableCellClasses} from '@mui/material';
import {styled} from '@mui/material/styles';

export default styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        color: '#AAAAAA'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));