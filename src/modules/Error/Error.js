import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RedirectWithTime, Loading } from '../../_components';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

//styles
const styles = context => ({
  root: {
      padding: 20,
    },
    paper: {
      padding: 16,
      textAlign: 'center',
    },
});

class Error extends Component {

  render() {
    let { location, classes } = this.props;
    let timer = 3; //secs before redirect && loading
    return (
      <div>
        <Loading timer={timer} color="accent"/>
        <div className={classes.root}>
          <Grid container spacing={40}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography type="subheading">Page introuvable <code>{location.pathname}</code></Typography>
                <RedirectWithTime location={location} pathname="/" timer={timer}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

Error.propTypes = {
  location : PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const ErrorWithStyles = withStyles(styles)(Error);

export { ErrorWithStyles as Error }
