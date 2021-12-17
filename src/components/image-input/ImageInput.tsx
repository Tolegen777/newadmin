import { Button } from '@mui/material';
import React from 'react';

type Props = {
  title: string,
  value: string[],
  handleChange: (value: any) => void,
  width: string,
  height: string,
};

const ImageInput: React.FC<Props> = (props) => {

  const { width, height } = props;

  return (
    <Button
      variant="outlined"
      component="label"
      style={{ height: height, width: width, marginRight: "10px" }}
    >
      <span style={{ fontSize: "12px", fontWeight: "lighter", color: "grey" }}>
        {props.title}
      </span>
      <input
        type="file"
        hidden
        accept="image/png, image/gif, image/jpeg"
        name="images"
        onChange={props.handleChange}
      />
    </Button>
  )
}



export default ImageInput;
