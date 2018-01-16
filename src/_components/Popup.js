import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Popup extends Component {
  handleRequestClose = () => {
    this.props.handleRequestClose();
  };

  handleRequestAcion = () =>{
    this.props.action();
    this.props.handleRequestClose();
  }

  render() {
    let { title, message, open } = this.props;

    const handleRequestClose = this.handleRequestClose;
    const handleRequestAcion = this.handleRequestAcion;
    return (
      <div>
        <Dialog
          open={open}
          transition={Transition}
          keepMounted
          onRequestClose={handleRequestClose}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRequestClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleRequestAcion} color="accent">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};
export { Popup };
