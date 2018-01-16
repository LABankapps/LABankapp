import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

//material-ui import
import Typography from 'material-ui/Typography';

class RedirectWithTime extends Component {
  constructor(props) {
    super(props);
    this.state = { timer : props.timer };
  }

  componentDidMount(){
    this.timerID = setInterval(() => this.countDown(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  countDown(){
    this.setState((prevState) => ({
      timer: prevState.timer -1
    }));
  }

  render() {
    // pathname must be something like /login or /register
    let { pathname, location, text }  = this.props;
    let { timer } = this.state;
    return (
      <div>
        {text && <Typography type="caption"> Redirection dans : {timer} !</Typography>}
        {timer === 0 &&
        <Redirect to={{
          pathname: pathname,
          state: { from: location }
        }}/>}
      </div>
    );
  }

}

RedirectWithTime.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  timer: PropTypes.number.isRequired,
  text: PropTypes.bool.isRequired,
};

RedirectWithTime.defaultProps = {
  pathname: "/",
  timer: 3,
  text: false,
};

export { RedirectWithTime };
