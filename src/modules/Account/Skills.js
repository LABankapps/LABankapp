import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { skillActions } from '../../_actions';
import { AppTable } from '../../_components';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
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

const getSkillsInfo = (engines) => {
  let SkillsInfo = [];
  engines.map((engine) => {
    return SkillsInfo.push({ name: engine.name, _id: engine.name});
  });
  return SkillsInfo.sort((a, b) => ( a.name < b.name ? -1 : 1));
}

class Skills extends Component {
  constructor(props){
    super(props);
    this.state = { data: [] };
    this.props.dispatch(skillActions.getSkill(props.state.user.blockChainId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items !== this.props.items && typeof nextProps.items !== 'undefined'){
      this.setState({
        data: getSkillsInfo(nextProps.items)
      });
    }
  }

  deleteSkills = (e, name) => {
    this.props.dispatch(skillActions.deleteSkill(this.props.state.user.blockChainId, name));
  }

  render() {
    let { classes, loading } = this.props;
    let { data } = this.state;

    const columnData = [
      { id: 'name', image: false, numeric: false, disablePadding: false, label: 'Nom', required: true, multiline: false },
    ];

    const deleteSkills = this.deleteSkills;
    return (
      <div className={classes.root}>
        {
          data[0] !== undefined ? (
            <Grid item xs>
              <Paper>
                <AppTable tableName="Compétences" columnData={columnData} data={data} delete={deleteSkills}/>
              </Paper>
            </Grid>
          ) : (
            loading ? (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            ) : (
              <div className={classes.skills}>
                Aucune compétence
              </div>
            )
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
    const items = typeof state.skills.items !== 'undefined' ? state.skills.items : undefined;
    const loading = state.skills.loading;
    return {
        items,
        loading
    };
}

const connectedSkills = connect(mapStateToProps)(Skills);
const connectedSkillsWithStyles = withStyles(styles)(connectedSkills);
export { connectedSkillsWithStyles as Skills };
