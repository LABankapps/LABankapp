import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { pink } from 'material-ui/colors';

//material-ui-icon import
import SettingsIcon from 'material-ui-icons/Settings';

//styles
const styles = context => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  balance: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    fontSize: 50,
    color: pink[300],
  },
  ecr: {
    width: 45,
    height: 40
  },
});

class Wallet extends Component {
  constructor(props){
    super(props);
    this.props.dispatch(userActions.getBalance(props.state.user.blockChainId));
  }

  render() {
    let {balance, classes} = this.props;
    return (
      <div className={classes.root}>
        {
          balance ? (
            <div className={classes.balance}>{balance} <SettingsIcon className={classes.ecr}/></div>
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

Wallet.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const balance = typeof state.users.balance !== 'undefined' ? state.users.balance : undefined;
    return {
        balance
    };
}

const connectedWallet = connect(mapStateToProps)(Wallet);
const connectedWalletWithStyles = withStyles(styles)(connectedWallet);
export { connectedWalletWithStyles as Wallet };
