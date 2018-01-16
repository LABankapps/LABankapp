import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TabsAccount, Informations, Skills, Wallet } from './';
import { Loading } from '../../_components';
import { userActions } from '../../_actions';
import { setUserInfo, sentUserInfo } from '../../_helpers';

//Material-ui import
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

//styles
const styles = context => ({
  root: {
    padding: 20,
    marginTop: context.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
  },
});


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      newPassword: "",
      lastPassword: "",
      newPasswordCheck: ""
    };

    this.props.dispatch(userActions.getById(props._id));
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.items !== 'undefined' && setUserInfo(nextProps.items[0]) !== this.state.user ){
      this.setState({
        user: setUserInfo(nextProps.items[0])
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      user: { ...prevState.user, [name]: value}
    }));
  }

  handleChangePassword = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (user) => {
    this.setState(prevState => ({
      user: { ...prevState.user, [Object.keys(user)[0]]: Object.values(user)[0]}
    }), () => {
      this.props.dispatch(userActions.update(sentUserInfo(this.state.user)));
    });

  }

  handleSubmitPassword = (password) => {
    this.setState({
      lastPassword: password.lastPassword,
      newPassword: password.newPassword,
      newPasswordCheck: password.newPasswordCheck
    }, () => {
      if(password.lastPassword && password.newPassword && password.newPasswordCheck){
        this.props.dispatch(userActions.updatePassword(sentUserInfo(this.state.user), password));
      }
    });
  }

  tabChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    let { tab, user } = this.state;
    let { loading, classes } = this.props;

    const tabChange = this.tabChange;

    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;

    const handleChangePassword = this.handleChangePassword;
    const handleSubmitPassword= this.handleSubmitPassword;
    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper>
                <TabsAccount tab={tab} tabChange={tabChange}/>
              </Paper>
            </Grid>
            <Grid item xs={12} className={classes.center}>
              { user ?
                <Paper>
                  { tab === 0 &&  <Informations state={this.state} handleChange={handleChange} handleSubmit={handleSubmit} handleChangePassword={handleChangePassword} handleSubmitPassword={handleSubmitPassword} /> }
                  { tab === 1 && <Skills/> }
                  { tab === 2 && <Wallet/> }
                </Paper> :
                <CircularProgress />
              }
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

Account.propTypes = {
  users: PropTypes.array,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { _id } = typeof state.authentication.user.user !== 'undefined' ? state.authentication.user.user : "";
  const { loading } = state.users;
  const { items } = typeof state.users !== 'undefined' ? state.users : {};
    return {
        _id,
        loading,
        items
    };
}

const connectedAccount = connect(mapStateToProps)(Account);
const connectedAccountWithStyles = withStyles(styles)(connectedAccount);
export { connectedAccountWithStyles as Account };
