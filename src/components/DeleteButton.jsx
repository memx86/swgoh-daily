import { useState } from 'react';
import {
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const DeleteButton = ({ handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAlert = () => setIsOpen(true);
  const closeAlert = () => setIsOpen(false);

  const onOkPress = () => {
    handleDelete();
    closeAlert();
  };

  return (
    <>
      <ListItemButton
        sx={{ padding: 0, borderRadius: '50%' }}
        aria-label="delete"
        onClick={openAlert}
      >
        <CloseIcon />
      </ListItemButton>
      <Dialog
        open={isOpen}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Character will be deleted from the list
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert}>Cancel</Button>
          <Button onClick={onOkPress} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
