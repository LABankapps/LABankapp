import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }
  handleRequestClose = () => {
    this.props.handleRequestClose();
    this.reset();
  };

  handleRequestValidate = () => {
    this.props.handleRequestClose(this.state.email);
    this.reset();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  reset = () => {
    this.setState({
       email: ''
    });
  }

  render() {
    let { open } = this.props;
    let { email } = this.state;

    const handleRequestClose = this.handleRequestClose;
    const handleRequestValidate = this.handleRequestValidate;
    const handleChange = this.handleChange;
    return (
        <Dialog open={open} onRequestClose={handleRequestClose}>
          <DialogTitle>Reset de mot de passe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour réinitialiser votre mot de passe, indiquez l'email que vous avez utilisé, afin que nos service puisse vous envoyer un mot de passe temporraire.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRequestClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleRequestValidate} color="accent">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

ResetPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

ResetPassword.defaultProps = {
  open: false,
};

export { ResetPassword };
