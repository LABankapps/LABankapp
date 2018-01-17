import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { history, theme } from './_helpers';
import { alertActions } from './_actions';
import { AppBar, Router, Alert } from './_components'

//material-ui import
import { MuiThemeProvider } from 'material-ui/styles';

class App extends Component {
  constructor(props){
    super(props);

    //listen on url change
    history.listen((location, action) => {
      // clear alert on location change
      props.dispatch(alertActions.clear());

    });

    //Fix document margin style
    document.body.style.margin = '0px';

    //Add a background color
    document.body.style.background = '#fafafa';
  }

  switch = (pathname) => {
    switch(pathname.toLowerCase()){
      case '/':
        return 'Tableau de bord';
      case '/login':
        return 'Connexion';
      case '/register':
        return 'Inscription';
      case '/engine':
        return 'Machines';
      case '/account':
        return 'compte';
      case '/order':
        return 'Commandes';
      case '/skill':
        return 'Compétences';
      case '/admin/users':
        return 'Admin - Utilisateurs';
      case '/admin/engines':
        return 'Admin - Machines';
      case '/admin/records':
        return 'Admin - Transactions';
      default:
        return '';
    }
  }

  render() {
    let { alert } = this.props;
    //width
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    let message = w > 550 ? 'LABank - ' + this.switch(history.location.pathname) : this.switch(history.location.pathname);
    return(
      <MuiThemeProvider theme={theme.renderTheme}>
        <AppBar message={message}/>
        <Alert alert={alert}/>
        <Router/>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  alert: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
