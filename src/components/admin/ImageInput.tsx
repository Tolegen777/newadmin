import {IconButton} from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    image?: any
    onChange: (str: string, val: any) => void
}

const ImageInput: React.FC<Props> = ({image, onChange}) => {
    const inputFileRef = React.useRef<null | HTMLInputElement>(null);
    const onBtnClick = () => {
        inputFileRef.current?.click();
    };
    return (
        <div style={{
            background: image ? URL.createObjectURL(image) : '#c4d0e2df',
            height: '100px',
            width: '100px', position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
            cursor: 'pointer',
            marginTop: '10px'
        }} onClick={onBtnClick}>
            {image ? <EditIcon/> : <AddIcon/>}
            <input
                type="file"
                ref={inputFileRef}
                hidden
                accept="image/png, image/gif, image/jpeg"
                required
                onChange={(event) => {
                    const element = event.currentTarget as HTMLInputElement
                    const files = element?.files
                    if (files) {
                        const value = files[0]
                        onChange("image", value)
                    }
                }}
            />
        </div>
    )
}

export default ImageInput
