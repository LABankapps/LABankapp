import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

  class PrivateRoute extends React.Component {
    render() {
      let {role, isAdmin, isLoggedIn, component: Component, ...rest} = this.props;
      let admin = isAdmin && role !== "Member" ? true : false;
      let pathname = isLoggedIn ? "/" : "/login"
      /*mobile test / dev override
      admin = true;
      isLoggedIn = true;*/
      return(
        <Route {...rest} render={props => (
          isLoggedIn && !isAdmin ? (
            <Component {...props}/>
          ) : (
            admin ? (
              <Component {...props}/>
            ) :
              <Redirect to={{
                pathname: pathname,
                state: { from: props.location }
              }}/>
          )
        )}/>
      )
    }
  }


PrivateRoute.propTypes = {
  component : PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  role: PropTypes.string,
}

PrivateRoute.defaultProps = {
  isAdmin: false,
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.authentication;
    const { role } = typeof state.authentication.user !== 'undefined' ? state.authentication.user.user : { role: "Member"};
    return {
        isLoggedIn,
        role
    };
}

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export { connectedPrivateRoute as PrivateRoute };
