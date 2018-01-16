import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import ErrorOutlineIcon from 'material-ui-icons/ErrorOutline';

//up for dialog && left for snackar
const Transition = ({...props}) => (
  <Slide direction="left" {...props} />
);

//styles
const styles = context => ({
  message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: context.spacing.unit,
    },
});

//Render an alert on actions error
class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      transition: Transition,
      timer: 6,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.alert.message !== 'undefined'){
      this.handleClickOpen();
      if(this.state.timer === 6){
        this.setState({
          timerLoginAttempt: 5
        }, () => {
          this.timerID = setInterval(() => this.countDown(), 1000);
        });
      }
    }else{
      this.handleRequestClose();
      clearInterval(this.timerID);
    }
  }

  countDown(){
    this.setState((prevState) => ({
      timer: prevState.timer - 1
    }));

    if(this.state.timer === 0){
      this.setState((prevState) => ({
        timer: 6
      }));
      this.handleRequestClose();
      clearInterval(this.timerID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { alert, classes } = this.props;

    let vertical = "bottom";
    let horizontal = "right";
    return (
      <div>
        <Snackbar
          open={this.state.open}
          anchorOrigin={{vertical, horizontal}}
          onRequestClose={this.handleRequestClose}
          transition={this.state.transition}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id" className={classes.message}><ErrorOutlineIcon className={classes.icon}/>{alert.message}</span>
          }
        />
      </div>
    );
  }

}

Alert.propTypes = {
  alert : PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const AlertWithStyles = withStyles(styles)(Alert);
export { AlertWithStyles as Alert }
