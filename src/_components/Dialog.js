import React from 'react';
import PropTypes from 'prop-types';

import { theme } from '../_helpers';

//material-ui import
import Typography from 'material-ui/Typography';

//Render a simple Dialog
const Dialog = ({message, style, type, className}) => (
  <Typography className={className} type={type} style={style}>{message}</Typography>
);

Dialog.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
};

Dialog.defaultProps = {
  type: "title",
  style: theme.getRowStyle('white', ''),
};

export { Dialog }
