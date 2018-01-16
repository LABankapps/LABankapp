import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { theme } from '../_helpers';

//material-ui import
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

//SimpleBar render the LABank bar
class SimpleBar extends Component {
  render() {
    let { children } = this.props;
    return (
      <AppBar position="static" style={theme.getRowStyle('', 'primaryColor',)}>
        <Toolbar>
          {children}
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleBar.propTypes = {
  children: PropTypes.array.isRequired,
};

export { SimpleBar };
