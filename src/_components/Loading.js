import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { LinearProgress } from 'material-ui/Progress';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { timer : 0 };
  }

  componentDidMount(){
    this.timerID = setInterval(() => this.countDown(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  countDown(){
    this.setState((prevState, props) => ({
      timer: prevState.timer + (100 / (props.timer * 10))
    }));
  }

  render() {
    let { timer } = this.state;
    let { color, mode } = this.props;
    return (
      <LinearProgress style={{marginBottom: '-5px'}} mode={mode} value={timer} color={color} />
    );
  }

}

Loading.propTypes = {
  timer: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  timer: 1,
  color: "accent",
  mode: "determinate"
};

export { Loading }
