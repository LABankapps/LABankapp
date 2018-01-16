import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Dialog, Loading } from '../../_components';
import { recordActions, userActions, engineActions } from '../../_actions';
import { theme, setUserInfo, setRecordInfo, setEngineInfo } from '../../_helpers';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';
import { orange, red, green } from 'material-ui/colors';
import Divider from 'material-ui/Divider';

//material-ui-icon import
import SettingsIcon from 'material-ui-icons/Settings';

//styles
const styles = context => ({
  root: {
      padding: 20,
    },
    paper: {
      padding: 16,
      textAlign: 'left',
    },
    paperContent: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 200,
    },
    rowReservation: {
      border: '1px solid #757575',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
      display: 'flex',
      color: '#757575',
      margin: 1,
      cursor: 'pointer',
      padding: 2,
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 200,
    },
    alignItems:{
      alignItems: 'center',
      display: 'flex',
    },
    waiting: {
      background: orange[50],
    },
    cancel: {
      background: red[50],
    },
    accept: {
      background: green[50],
    }
});

const getRecordsInfo = (records) =>{
  let recordsInfo = [];
  records.map((record) => {
    return recordsInfo.push(setRecordInfo(record));
  });
  return recordsInfo;
}

const getEnginesInfo = (engines) => {
  let enginesInfo = [];
  engines.map((engine) => {
    return enginesInfo.push(setEngineInfo(engine));
  });
  return enginesInfo;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(recordActions.getByUserId(props.user._id));
    this.props.dispatch(userActions.getById(props.user._id));
    this.props.dispatch(engineActions.getAll());

    this.state = {
      records: [],
      engines: [],
      user: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.records !== this.props.records && typeof nextProps.records !== 'undefined'){
      this.setState({
        records: getRecordsInfo(nextProps.records)
      });
    }
    if(typeof nextProps.users !== 'undefined' && setUserInfo(nextProps.users[0]) !== this.state.user){
      this.setState({
        user: setUserInfo(nextProps.users[0])
      });
    }
    if(nextProps.engines !== this.props.engines && typeof nextProps.engines !== 'undefined'){
      this.setState({
        engines: getEnginesInfo(nextProps.engines)
      });
    }
  }

  getStatus = (status) =>{
    switch(status){
      case 'Accept':
        return "Valider";
      case 'Cancel':
        return "Annuler";
      default:
        return "En attente de payement";
    }
  }

  render() {
    let { records, user, engines } = this.state;
    let { classes, loading, loadingUser } = this.props;

    const getStatus = this.getStatus;
    return (
      <div>
        { (loading || loadingUser) &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Dialog message={'Bienvenue ' + user.firstName + ' ' + user.lastName} type="title" style={theme.getRowStyle('darkGrey', 'none')}/>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Dialog message="RESERVATIONS" type="title" style={theme.getRowStyle('darkGrey', 'none')}/>
                <Divider />
                <div className={classes.paperContent}>
                  {
                    records && engines ? (
                      records.map(record => {
                        let engineName = engines.filter(engine => engine._id === record.engine)[0];
                        const dateDurationUser = new Date(new Date(record.date).getTime() + (new Date(record.duration).getHours() * 60 + new Date(record.duration).getMinutes()) * 60000 ).toLocaleString();
                        return (
                          <Tooltip key={record._id} title={"termine le " + dateDurationUser} placement='bottom' enterDelay={300}>
                            <div className={classnames(classes.rowReservation, {
                                  [classes.waiting]: record.status === 'Waiting',
                                  [classes.accept]: record.status === 'Accept',
                                  [classes.cancel]: record.status === 'Cancel',
                                }
                              )}>
                              <span>"{engineName !== undefined ? engineName.name : ""}"</span> du <span>{new Date(record.date).toLocaleString()}</span> pendant <span>{new Date(record.duration).toLocaleTimeString().slice(0, -3)}</span> h <span className={classes.alignItems}>({record.price} <SettingsIcon />)</span>  | <span>{getStatus(record.status)}</span>
                            </div>
                          </Tooltip>
                        )
                      })
                    ) : (
                      <div className={classes.loading}>
                        <CircularProgress />
                      </div>
                    )
                  }
                </div>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Dialog message="TIRELIRE" type="title" style={theme.getRowStyle('darkGrey', 'none')}/>
                <Divider />
                <div className={classes.paperContent}>
                  {
                    user.wallet ? (
                      <div>{user.wallet}</div>
                    ) : (
                      <div className={classes.loading}>
                        <CircularProgress />
                      </div>
                    )
                  }
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const { user } = typeof state.authentication.user !== 'undefined' ? state.authentication.user : { user: {} };
    const records = typeof state.records.items !== 'undefined' ? state.records.items : undefined;
    const users = typeof state.users.items !== 'undefined' ? state.users.items : undefined;
    const engines = typeof state.engines.items !== 'undefined' ? state.engines.items : undefined;
    const { loading } = state.records;
    const loadingUser = state.users.loading;
    return {
        user,
        records,
        engines,
        users,
        loading,
        loadingUser
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
const connectedDashboardWithStyles = withStyles(styles)(connectedDashboard);
export { connectedDashboardWithStyles as Dashboard };
