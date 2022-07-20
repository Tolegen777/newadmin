import {Box, Button, IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";
import editIcon from "./../../assets/icons/editIcon.svg"
import {styled} from "@mui/material/styles";

const useStyles = makeStyles({
    imageContainer: {
        width: "120px",
        height: "120px",
        marginBottom: "2rem",
        position: "relative",
        textAlign: "center",
        "&>:nth-child(1)": {
            height: "120px",
            width: "120px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            top: "0",
            left: "0",
            border: "1px solid #999999",
            borderRadius: "10px",
            filter: "brightness(0.8)",
        },
        "&>:nth-child(2)": {
            position: "absolute",
            height: "30px",
            width: "30px",
            top: "40%",
            left: "40%",
            // color:"red",
            //border:"1px solid blue"
        }
    },
})

const StyledBox = styled(Box,)(({theme}) => ({
    position: "absolute",
    top: "5px",
    left: "5px",
    width: "25px",
    height: "25px",
    background: "#FFFFFF",
    boxShadow: "0px 0px 18.3839px -4.59596px rgba(0, 0, 0, 0.2)",
    borderRadius: "40px",
    fontWeight: "700",
    fontSize: "14px",
    color: "#8A3FFC"
}))

type Props = {
    image: any,
    handleChange: (input: any) => void,
    handleDelete?: () => void,
    count: number
}

const FileCard: React.FC<Props> = ({image, handleChange, handleDelete, count}) => {
    const classes = useStyles();

    return (
        <div className={classes.imageContainer}>
            <img src={image} alt={image}/>
            <>
                <IconButton component="label">
                    <img src={editIcon} alt="иконка"/>
                    <input
                        type="file"
                        hidden
                        accept="image/png, image/gif, image/jpeg"
                        name="images"
                        onChange={handleChange}
                    />
                </IconButton>
                <StyledBox>{count}</StyledBox>
                {handleDelete && <Button variant="outlined" size="small" onClick={handleDelete}>Удалить</Button>}
            </>


        </div>
    )
}

export default FileCard;