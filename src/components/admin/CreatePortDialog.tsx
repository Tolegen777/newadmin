import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

type Props = {
  open: boolean;
  handleClose: () => void
}

const CreatePortDialog: React.FC<Props> = ({ open, handleClose }) => {
  // const [createPort, { isLoading, isError, status }] = useCreatePortMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      latitude: 0.0,
      longitude: 0.0
    },
    onSubmit: (values) => {
      console.log(values);
      // createPort(values);
    },
  })

  // React.useEffect(() => {
  //   if(status === 'fulfilled') {
  //     handleClose();
  //   }
  // }, [status])

  const { values, setFieldValue, handleChange, handleSubmit } = formik;

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            Port creating/editing
          </Typography>
          <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between' }}>
            {/* <Button variant="contained" sx={{ background: '#F4F4F4', color: '#444444', boxShadow: 0 }} onClick={handleClose} disabled={isLoading}>Cancel</Button> */}
            {/* <Button variant="contained" sx={{ background: '#0076BD', boxShadow: 0 }} type="submit" disabled={isLoading}>Save</Button> */}
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            name="latitude"
            value={values.latitude}
            type={"number"}
            onChange={handleChange}
            required
            label="Latitude"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            name="longitude"
            value={values.longitude}
            type={"number"}
            onChange={handleChange}
            required
            label="Longitude"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          {/* {
            isError &&
            < Typography color="error" variant="caption">
              Error occured! Try later or change latitude or longitude!
            </Typography>
          } */}
        </DialogContent>
      </form>
    </Dialog >
  )
}

export default CreatePortDialog
