import React from 'react';
import PropTypes from 'prop-types';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

//styles
const styles = context => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});

const Skills = ({state, classes}) => (
  <div className={classes.root}>
    {
      state.user.wallet ? (
        <div>{state.user.wallet}</div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )
    }
  </div>
);

Skills.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const SkillsWithStyles = withStyles(styles)(Skills);
export { SkillsWithStyles as Skills };
