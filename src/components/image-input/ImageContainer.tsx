import {Button, IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles({
    imageContainer: {
        width: "100px",
        height: "100px",
        marginBottom: "2rem",
        position: "relative",
        textAlign: "center",
        "&>:nth-child(1)": {
            height: "100px",
            width: "100px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            top: "0",
            left: "0",
            filter: "brightness(0.5)",
        },
        "&>:nth-child(2)": {
            position: "absolute",
            height: "30px",
            width: "30px",
            top: "35px",
            left: "35px",
        }
    },
})

type Props = {
    image: any,
    handleChange: (input: any) => void,
    handleDelete?: () => void
}

const ImageContainer: React.FC<Props> = ({image, handleChange, handleDelete}) => {
    const classes = useStyles();

    return (
        <div className={classes.imageContainer}>
            <img src={image} alt={image} style={{
                filter: "brightness(1)",
                borderRadius: "6px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "90px",
                height: "90px",
                objectFit: "contain"
            }}/>
            {handleDelete ?
                <>
                    <IconButton component="label">
                        <EditIcon/>
                        <input
                            type="file"
                            hidden
                            accept="image/png, image/gif, image/jpeg"
                            name="images"
                            onChange={handleChange}
                        />
                    </IconButton>
                    <Button variant="outlined" size="small" onClick={handleDelete}>??????????????</Button>
                </> : <IconButton component="label" onClick={handleChange} sx={{marginTop: "60px"}}>
                    <EditIcon/>
                    <input
                        type="file"
                        hidden
                        accept="image/png, image/gif, image/jpeg"
                        name="images"
                        onChange={handleChange}
                    />
                </IconButton>
            }


        </div>
    )
}

export default ImageContainer;