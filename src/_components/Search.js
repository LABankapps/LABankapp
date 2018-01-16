import React from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';

//material-ui-icons import
import SearchIcon from 'material-ui-icons/Search';

//styles
const styles = context => ({
  input: {
    margin: context.spacing.unit,
  },
  icon: {
    margin: 'auto',
    marginRight: context.spacing.unit,
    height: 24,
  },
});

const Search = ({classes, style, filtrer, placeholder}) => (
  <Input disableUnderline className={classes.input} style={style} name="Search" type="text" onChange={filtrer} placeholder={placeholder}
    startAdornment={
    <InputAdornment position="start" className={classes.icon}>
      <SearchIcon/>
    </InputAdornment>}/>
);

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  filtrer: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const SearchWithStyles = withStyles(styles)(Search);
export { SearchWithStyles as Search }
