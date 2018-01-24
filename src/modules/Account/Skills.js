import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { skillActions } from '../../_actions';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { pink } from 'material-ui/colors';

//styles
const styles = context => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  skills: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    fontSize: 30,
    color: pink[300],
  },
});

class Skills extends Component {
  constructor(props){
    super(props);
    this.props.dispatch(skillActions.getSkill(props.state.user.blockChainId));
  }

  render() {
    let {skills, classes} = this.props;
    return (
      <div className={classes.root}>
        {
          skills ? (
            skills[0] !== undefined ? (
              skills.map(skill =>
                <div key={skill.name}>{skill.name}</div>
              )
            ) :
            (
              <div className={classes.skills}>
                Aucune compétence
              </div>
            )
          ) : (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )
        }
      </div>
    );
  }

}

Skills.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const skills = typeof state.skills.items !== 'undefined' ? state.skills.items : undefined;
    return {
        skills
    };
}

const connectedSkills = connect(mapStateToProps)(Skills);
const connectedSkillsWithStyles = withStyles(styles)(connectedSkills);
export { connectedSkillsWithStyles as Skills };
