import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleBar, Dialog, AccountMenu, Menu } from '../';

//material-ui import
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
  flex: {
    flex: 1,
  },
  title: {
    marginLeft: 24,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuList: {
    width: 250,
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
});

class AppBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorElAccountMenu: null,
      isMenu: false,
    };
  }

  handleAccountMenu = (e) => {
    this.setState({ anchorElAccountMenu: e.currentTarget });
  };

  handleAccountMenuRequestClose = () => {
    this.setState({ anchorElAccountMenu: null });
  };

  handleMenu = () => {
    this.setState({ isMenu: true });
  };

  handleMenuRequestClose = () => {
    this.setState({ isMenu: false });
  };

  render() {
    let { anchorElAccountMenu, isMenu } = this.state;

    //AccountMenu consts
    let handleAccountMenu = this.handleAccountMenu;
    let handleAccountMenuRequestClose = this.handleAccountMenuRequestClose;

    //width
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    //NavMenu consts
    let handleMenu = this.handleMenu;
    let handleMenuRequestClose = this.handleMenuRequestClose;

    let { message, classes, isLoggedIn, user } = this.props;
    return (
      <SimpleBar>
        <div className={classes.menuButton}>
          { isLoggedIn && <Menu isMenu={isMenu} handleMenu={handleMenu} handleMenuRequestClose={handleMenuRequestClose}/>}
        </div>
        <div className={classes.flex}>
          <Dialog className={classes.title} message={message}/>
        </div>
        { isLoggedIn &&
          <div className={classes.inline}>
            { (user.firstName && w > 550) &&
              <Dialog className={classes.title} type="body1" message={"Bienvenue " + user.firstName + " " + user.lastName}/>
            }
            <AccountMenu anchorElAccountMenu={anchorElAccountMenu} handleAccountMenu={handleAccountMenu} handleAccountMenuRequestClose={handleAccountMenuRequestClose}/>
          </div>
        }
      </SimpleBar>
    );
  }
}

AppBar.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
};

function mapStateToProps(state) {
    const { isLoggedIn } = state.authentication;
    const { user } = typeof state.authentication.user !== 'undefined' ? state.authentication.user : '';
    return {
        isLoggedIn,
        user
    };
}

const connectedApp = connect(mapStateToProps)(AppBar);
const AppBarWithStyles = withStyles(styles)(connectedApp);
export { AppBarWithStyles as AppBar }
