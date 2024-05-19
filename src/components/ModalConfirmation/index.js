import React from 'react'

import PropTypes from 'prop-types'

import Close from '@mui/icons-material/Close'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@mui/material'

export default function ModalConfirmation({
  buttonCancelTitle = 'Cancel',
  buttonConfirmTitle = 'OK',
  handleCancel,
  handleClose,
  onConfirm,
  open,
  size = '700px',
  subtitle = 'Modal subtitle',
  title = 'Modal title'
}) {
  return (
    <Dialog
      aria-describedby='modal-confirmation-description'
      aria-labelledby='modal-confirmation-title'
      fullWidth
      onClose={handleClose}
      open={open}
      size={size}>
      <DialogTitle className='align-title' id='alert-dialog-title'>
        <Grid container spacing={2}>
          <Grid item md={10} xs={10}>
            {title}
          </Grid>
          <Grid item md={2} xs={2}>
            <Close
              fontSize='small'
              onClick={handleClose}
              style={{
                float: 'right',
                cursor: 'pointer'
              }}
            />
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText>{subtitle}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} variant='outlined'>
          {buttonCancelTitle}
        </Button>
        <Button
          color='primary'
          onClick={onConfirm}
          style={{ minWidth: 150 }}
          variant='contained'>
          {buttonConfirmTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ModalConfirmation.propTypes = {
  buttonCancelTitle: PropTypes.string,
  buttonConfirmTitle: PropTypes.string,
  handleCancel: PropTypes.func,
  handleClose: PropTypes.func,
  onConfirm: PropTypes.func,
  open: PropTypes.bool,
  size: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string
}
