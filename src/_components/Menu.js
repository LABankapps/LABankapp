import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { theme } from '../_helpers';

//material-ui icon import
import IconButton from 'material-ui/IconButton';
import DevicesIcon from 'material-ui-icons/Devices';
import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';

//material-ui import
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

//styles
const styles = context => ({
  menuList: {
    width: 250,
  },
  menuTitleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  menuTitle: {
    padding: 6,
    paddingBottom: 0,
  },
  menuSubTitle: {
    paddingTop: 0,
    padding: 6
  },
  link: {
    textDecoration: 'none',
    outline: 0,
  },
  adminListText: {
    padding: '0 16px',
  },
});

//Render the navigation menu on the LABank bar
class Menu extends Component {
  onOpen = () => {
    this.props.handleMenu();
  }

  onClose = () => {
    this.props.handleMenuRequestClose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isMenu && document.getElementsByClassName('MuiDrawer-paperAnchorLeft-61')[0]){
      //fix drawer outline
       document.getElementsByClassName('MuiDrawer-paperAnchorLeft-61')[0].style.outline = 0;
    }
  }

  render() {
    const { isMenu, classes, role } = this.props;

    const onOpen = this.onOpen; //Handle click on menu 'open'
    let onClose = this.onClose; //Handle click on menu 'close'

    const navName = [
      { name: 'Machines', icon: DevicesIcon, link: '/engine' },
    ];

    const navAdminName = [
      { name: 'Utilisateurs', icon: SettingsIcon, link: '/admin/users' },
      { name: 'Machines', icon: SettingsIcon, link: '/admin/engines' },
      { name: 'Transactions', icon: SettingsIcon, link: '/admin/records' }
    ];

    return(
      <div>
        <IconButton  style={theme.getRowStyle('white', '')} onClick={onOpen} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Drawer open={isMenu} onClose={onClose}>
          <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            <div className={classes.menuTitleContainer}>
              <Link className={classes.link} style={theme.getRowStyle('', 'none')} to="/">
                <Typography type="headline" className={classes.menuTitle} style={theme.getRowStyle('darkGrey', '')}>LABank</Typography>
                <Typography type="caption" className={classes.menuSubTitle} style={theme.getRowStyle('grey', '')}>v.1.0.0</Typography>
              </Link>
            </div>
            <Divider />
            <List>
              {navName.map((item) => (
                <Link key={item.name} className={classes.link} style={theme.getRowStyle('', 'none')} to={item.link}>
                  <ListItem button>
                    <ListItemIcon>
                      {React.createElement(item.icon)}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
            { role !== "Member" && (
              <div>
                <div className={classes.menuTitleContainer} style={theme.getRowStyle('', 'darkPrimaryColor')}>
                  <Typography type="headline" className={classes.menuTitle} style={theme.getRowStyle('white', '')}>Admin</Typography>
                </div>
                <div style={theme.getRowStyle('white', 'darkPrimaryColor')}>
                  {navAdminName.map((item) => (
                    <Link key={item.name} className={classes.link} style={theme.getRowStyle('', 'none')} to={item.link}>
                      <ListItem button>
                        <ListItemIcon style={theme.getRowStyle('white', 'none')}>
                          {React.createElement(item.icon)}
                        </ListItemIcon>
                        <ListItemText primary={
                          <span style={theme.getRowStyle('white', 'none')}>{item.name}</span>
                        } />
                      </ListItem>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    )
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  isMenu: PropTypes.bool.isRequired,
  handleMenuRequestClose: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
  role: PropTypes.string,
};

function mapStateToProps(state) {
    const { role } = state.authentication.user.user;
    return {
        role,
    };
}

const connectedMenu = connect(mapStateToProps)(Menu);
const connectedMenuWithStyles = withStyles(styles)(connectedMenu);
export { connectedMenuWithStyles as Menu };
