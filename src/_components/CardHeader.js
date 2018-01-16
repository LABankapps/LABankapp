import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { theme } from '../_helpers';
//material-ui impor
import { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

//material-ui-icon import
import SettingsIcon from 'material-ui-icons/Settings';

//styles
const styles = context => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: context.spacing.unit,
    minHeight: 72
  },
  mediaContainer: {
    overflow: 'hidden',
  },
  media: {
    height: 194,
    width: 300,
  },
  loading: {
    display: 'flex',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    alignItems: 'center',
    display: 'flex',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class _CardHeader extends Component {
  render() {
    let { title, image, location, price, classes } = this.props;
    return (
      <div className={classes.flex}>
        <CardContent className={classes.header}>
          <div>
            <Typography type="headline" style={theme.getRowStyle('black','')}>{title}</Typography>
            <Typography type="subheading" style={theme.getRowStyle('darkGrey','none')}>{location}</Typography>
          </div>
          <div>
            <Typography type="subheading" className={classes.price} style={theme.getRowStyle('darkPrimaryColor','')}>
              <SettingsIcon/>
              {price}
            </Typography>

          </div>
        </CardContent>
        <div className={classes.mediaContainer}>
          <img src={"data:image/png;base64," + image} className={classes.media} title="engine" alt="engine"/>
        </div>
      </div>
    );
  }

}

_CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const _CardHeaderWithStyles = withStyles(styles)(_CardHeader);
export { _CardHeaderWithStyles as CardHeader };
