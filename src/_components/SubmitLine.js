import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';

//material-ui-icon import
import DoneIcon from 'material-ui-icons/Done';
import UndoIcon from 'material-ui-icons/Undo';

//styles
const styles = context => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: context.spacing.unit,
    minWidth: 24,
    padding: 6
  },
});

class SubmitLine extends Component {
  constructor(props) {
    super(props);
    this.state = { object: props.reset };
  }

  handleSubmit = (e, reset = false) =>{
    e.preventDefault();
    if(!reset){
      this.setState({
        object: this.props.reset
      });
    }
    this.props.handleSubmit(Object.keys(this.state.object)[0], reset ? this.state.object : this.props.object);
  }

  render() {
    let { classes, touched } = this.props;

    const handleSubmit = this.handleSubmit;
    return (
      <div className={classes.root}>
        <Tooltip title="Annuler" placement='bottom' enterDelay={300}>
          <div>
            <Button disabled={!touched} raised className={classes.button} type="submit" color="primary" onClick={(e) => handleSubmit(e, true)}>
              <UndoIcon/>
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="Valider" placement='bottom' enterDelay={300}>
          <div>
            <Button disabled={!touched} raised className={classes.button} type="submit" color="accent" onClick={handleSubmit}>
              <DoneIcon/>
            </Button>
          </div>
        </Tooltip>
      </div>
    );
  }

}

SubmitLine.propTypes = {
  classes: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  reset: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

SubmitLine.defaultProps = {
  touched: false
};
const SubmitLineWithStyles = withStyles(styles)(SubmitLine);
export { SubmitLineWithStyles as SubmitLine }
