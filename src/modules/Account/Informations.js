import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, NumberFormatCustom, SubmitLine } from '../../_components';
import { theme } from '../../_helpers';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Radio, { RadioGroup } from 'material-ui/Radio';

//material-ui-icon import
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import PesonIcon from 'material-ui-icons/Person';
import LockIcon from 'material-ui-icons/Lock';


//styles
const styles = context => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  headlineContainer: {
    width: '100%',
  },
  headline: {
    margin: context.spacing.unit,
  },
  groupControl: {
    margin: context.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '270px',
  },
  formControl: {
    flexDirection: 'row',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: 'auto',
    marginRight: context.spacing.unit,
  },
  input: {
    margin: context.spacing.unit,
  },
});

class Informations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { touched: {}}
  }

  handleChange = (e) => {
    this.handleTouched(e.target.name); //set touched value
    this.props.handleChange(e);
  }

  handleChangePassword = (e) => {
    this.handleTouched('passwords'); //set touched value
    this.props.handleChangePassword(e);
  }

  handleTouched = (name, bool = true) =>{
    this.setState({
      touched: {
        ...this.state.touched,
        [name]: bool
      }
    });
  }

  handleSubmitPassword = (name, password = { newPassword: this.props.state.newPassword, lastPassword: this.props.state.lastPassword, newPasswordCheck: this.props.state.newPasswordCheck}) => {
    this.props.handleSubmitPassword(password);
    this.handleTouched('passwords', false);
  }

  handleSubmit = (name, user = this.props.state.user) => {
    this.props.handleSubmit(user);
    this.handleTouched(name, false);
  }

  render() {
    let { classes, state } = this.props;
    let { touched } = this.state;
    let { user, lastPassword, newPassword, newPasswordCheck } = state;

    const handleChange = this.handleChange;
    const handleChangePassword = this.handleChangePassword;
    const handleSubmit = this.handleSubmit;
    const handleSubmitPassword = this.handleSubmitPassword;
    return (
      <div className={classes.root}>
        <div className={classes.headlineContainer}>
          <Dialog className={classes.headline} message="COORDONNÉES" style={theme.getRowStyle('darkGrey', 'none')} type="subheading"/>
          <Divider/>
        </div>
        <div className={classes.groupControl}>
          <FormHelperText>Email</FormHelperText>
          <FormControl className={classes.formControl}>
            <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="email" type="email" value={user.email} onChange={handleChange} startAdornment={
              <InputAdornment position="start" className={classes.icon}>
                <EmailIcon/>
              </InputAdornment>}/>
            <SubmitLine touched={touched.email && true} handleSubmit={handleSubmit} reset={{email: user.email}}/>
          </FormControl>
          <FormHelperText>Téléphone (ex: +33 6 42 63 90 53)</FormHelperText>
          <FormControl className={classes.formControl}>
            <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="phone"  inputComponent={NumberFormatCustom} value={typeof user.phone !== 'undefined' ? user.phone : ''} onChange={handleChange} startAdornment={
              <InputAdornment position="start" className={classes.icon}>
                <PhoneIcon/>
              </InputAdornment>}/>
            <SubmitLine touched={touched.phone && true} handleSubmit={handleSubmit} reset={{phone: user.phone}}/>
          </FormControl>
        </div>
        <div className={classes.headlineContainer}>
          <Dialog className={classes.headline} message="INFORMATIONS GÉNÉRALES" style={theme.getRowStyle('darkGrey', 'none')} type="subheading"/>
          <Divider/>
        </div>
        <div className={classes.groupControl}>
          <FormHelperText>Prénom</FormHelperText>
          <FormControl className={classes.formControl}>
            <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="firstName" type="text" value={user.firstName} onChange={handleChange} startAdornment={
              <InputAdornment position="start" className={classes.icon}>
                <PesonIcon/>
              </InputAdornment>}/>
            <SubmitLine touched={touched.firstName && true} handleSubmit={handleSubmit} reset={{firstName: user.firstName}}/>
          </FormControl>
          <FormHelperText>Nom</FormHelperText>
          <FormControl className={classes.formControl}>
            <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="lastName" type="text" value={user.lastName} onChange={handleChange} startAdornment={
              <InputAdornment position="start" className={classes.icon}>
                <PesonIcon/>
              </InputAdornment>}/>
            <SubmitLine touched={touched.lastName && true} handleSubmit={handleSubmit} reset={{lastName: user.lastName}}/>
          </FormControl>

          <FormHelperText>Sexe</FormHelperText>
          <div className={classes.passwordContainer}>
          <RadioGroup aria-label="gender" name="gender" value={user.gender} onChange={handleChange}>
            <FormControlLabel value="M" control={<Radio />} label="Homme" />
            <FormControlLabel value="F" control={<Radio />} label="Femme" />
            <FormControlLabel value="O" control={<Radio />} label="Autre" />
          </RadioGroup>
          <SubmitLine touched={touched.gender && true} handleSubmit={handleSubmit} reset={{gender: user.gender}}/>
          </div>
        </div>
        <div className={classes.headlineContainer}>
          <Dialog className={classes.headline} message="MOT DE PASSE" style={theme.getRowStyle('darkGrey', 'none')} type="subheading"/>
          <Divider/>
        </div>
        <form className={classes.groupControl} autoComplete="off">
          <div className={classes.passwordContainer}>
            <div>
              <FormHelperText>Ancien mot de passe</FormHelperText>
              <FormControl className={classes.formControl}>
                <Input className={classes.input} autoComplete="off" style={theme.getRowStyle('darkGrey', 'none')} name="lastPassword" type="password" value={lastPassword} onChange={handleChangePassword} startAdornment={
                  <InputAdornment position="start" className={classes.icon}>
                    <LockIcon/>
                  </InputAdornment>}/>
              </FormControl>
              <FormHelperText>Nouveau mot de passe</FormHelperText>
              <FormControl className={classes.formControl}>
                <Input className={classes.input} autoComplete="off" style={theme.getRowStyle('darkGrey', 'none')} name="newPassword" type="password" value={newPassword} onChange={handleChangePassword} startAdornment={
                  <InputAdornment position="start" className={classes.icon}>
                    <LockIcon/>
                  </InputAdornment>}/>
              </FormControl>
              <FormHelperText>Nouveau mot de passe (vérification)</FormHelperText>
              <FormControl className={classes.formControl}>
                <Input className={classes.input} autoComplete="off" style={theme.getRowStyle('darkGrey', 'none')} name="newPasswordCheck" type="password" value={newPasswordCheck} onChange={handleChangePassword} startAdornment={
                  <InputAdornment position="start" className={classes.icon}>
                    <LockIcon/>
                  </InputAdornment>}/>
              </FormControl>
            </div>
            <SubmitLine touched={touched.passwords && true} handleSubmit={handleSubmitPassword} reset={{newPassword: newPassword, lastPassword: lastPassword, newPasswordCheck: newPasswordCheck}}/>
          </div>
        </form>
      </div>
    )
  }
}
Informations.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitPassword: PropTypes.func.isRequired
};

const InformationsWithStyles = withStyles(styles)(Informations);
export { InformationsWithStyles as Informations }
