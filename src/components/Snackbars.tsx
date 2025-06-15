import { Snackbar } from '@mui/joy';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const Snackbars = () => {

  const { openFailedAlert, setOpenFailedAlert, openSuccessAlert, setOpenSuccessAlert } = useAuth();
  
  return (
    <>
      < Snackbar
        autoHideDuration={3000}
        open={openFailedAlert}
        color={'danger'}
        variant='solid'
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpenFailedAlert(false);
        }}
      >
        Login Failed
      </Snackbar>
      < Snackbar
        autoHideDuration={3000}
        open={openSuccessAlert}
        color={'success'}
        variant='solid'
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpenSuccessAlert(false);
        }}
      >
        Login Succesful
      </Snackbar>
    </>
  )
}

export default Snackbars