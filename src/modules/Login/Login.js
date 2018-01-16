import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../../_actions';
import { Loading, Dialog, ResetPassword } from '../../_components';
import { theme } from '../../_helpers';

//material-ui import
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
//material-ui-icon import
import Send from 'material-ui-icons/Send';

//material-ui-form import
import { FormControl, FormGroup } from 'material-ui/Form';

//styles
const styles = context => ({
  root: {
    zIndex: -1,
    padding: 20,
    position: 'absolute',
    top: '64px',
    bottom: 0,
    left: 0,
    right: 0,
  },
  paper: {
    position: 'relative',
    padding: 16,
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    maxWidth: '350px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container: {
    height: '100%',
  },
  item: {
    margin: 'auto',
  },
  formControl: {
    margin: context.spacing.unit,
  },
  formGroup: {
    margin: context.spacing.unit,
    width: '100%',
  },
  withoutLabel: {
    marginTop: context.spacing.unit * 3,
  },
  button: {
    margin: context.spacing.unit,
  },
  textLink: {
    margin: 'auto',
    marginTop: 0,
    marginBottom: 0,
    textDecoration: 'none',
    color: '#757575',
    cursor: 'pointer',
    '&:hover': {
       color: '#E91E63',
       textDecoration: 'underline',
    }
  },
  title: {
    position: 'absolute',
    width: '100%',
    padding: '10px 0',
    marginBottom: 10,
    top: 0,
    left: 0,
    textAlign: 'center',
  },
  firstInputControl: {
    margin: context.spacing.unit,
    marginTop: context.spacing.unit + 20,
  },
  rightIcon: {
    marginLeft: context.spacing.unit,
  },
});

class Login extends React.Component {
  constructor(props) {
      super(props);

      // reset login status
      this.props.dispatch(userActions.logout());

      this.state = {
          email: '',
          password: '',
          showPassword : false,
          submitted: false,
          countLoginAttempt: 0,
          timerLoginAttempt: 30,
          resetPassword: false,
      };
  }

  handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      submitted: true
    });

    const { email, password } = this.state;
    const { dispatch } = this.props;
    if(this.state.countLoginAttempt < 3){

      if (email && password) {
          this.setState((prevState) => ({
            countLoginAttempt: prevState.countLoginAttempt + 1,
          }));
          dispatch(userActions.login(email, password));
      }
    }else{
      dispatch(alertActions.error(" ( "+ this.state.countLoginAttempt +" ) Tentatives maximum atteinte, veuillez attendre " + this.state.timerLoginAttempt + " secondes."));
      this.resetLoginAttempt();
    }
  }

    handleClickShowPasssword = (e) => {
      this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (e) => {
      e.preventDefault();
    }

    resetLoginAttempt = () => {
      if(this.state.timerLoginAttempt === 30){
        this.setState({
          timerLoginAttempt: 29
        }, () => {
          this.timerID = setInterval(() => this.countDown(), 1000);
        });
      }
    }

    countDown = () => {
      if(!this.state.timerLoginAttempt){
        this.setState((prevState) => ({
          countLoginAttempt: 0,
          timerLoginAttempt: 30
        }));
        clearInterval(this.timerID);
        this.props.dispatch(alertActions.clear());
      }else{
        this.setState((prevState) => ({
          timerLoginAttempt: prevState.timerLoginAttempt - 1
        }));
      }
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    handleRequestResetPasswordClose = (email = false) => {
      if(email){
        this.props.dispatch(userActions.resetPsswd(email));
      }

      this.setState({
        resetPassword: false
      });
    }

    handleRequestResetPasswordOpen = () =>{
      this.setState({
        resetPassword: true
      });
    }

    render() {
        let { isLoggedIn, classes } = this.props;
        let { email, password, submitted, showPassword, resetPassword } = this.state;

        const handleMouseDownPassword = this.handleMouseDownPassword;
        const handleClickShowPasssword = this.handleClickShowPasssword;
        const handleChange = this.handleChange;
        const handleSubmit = this.handleSubmit;
        const handleRequestResetPasswordClose = this.handleRequestResetPasswordClose;
        const handleRequestResetPasswordOpen = this.handleRequestResetPasswordOpen;
        return (
          <div>
            <ResetPassword open={resetPassword} handleRequestClose={handleRequestResetPasswordClose}/>
            { isLoggedIn && <Loading className={classes.formControl} mode="query"/>}
            <div className={classes.root}>
              <Grid container spacing={40} className={classes.container}>
                <Grid item xs className={classes.item}>
                  <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit} className={classes.form} autoComplete="login">
                      <FormGroup className={classes.formGroup}>
                        <Dialog className={classes.title} message="Se connecter !" style={theme.getRowStyle('white', 'primaryColor')} type="headline"/>
                      </FormGroup>
                      <FormControl fullWidth className={classes.firstInputControl}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input name="email" type="email" autoComplete="login-email" value={email} onChange={handleChange} />
                        {submitted && !email &&
                          <Dialog message="Email is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                        }
                      </FormControl>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type={showPassword ? 'text' : 'password'} value={password} autoComplete={"login-password"} onChange={handleChange} endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPasssword} onMouseDown={handleMouseDownPassword}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>}/>
                        {submitted && !password &&
                          <Dialog message="Password is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                        }
                      </FormControl>
                      <FormGroup className={classes.formGroup}>
                        <Button className={classes.button} type="submit" raised color="primary" onClick={this.handleSubmit}>
                          Connexion
                          <Send className={classes.rightIcon}/>
                        </Button>
                        <Link to="/register" className={classes.textLink}><Typography className={classes.textLink}>S'enregistrer ?</Typography></Link>
                        <Typography onClick={handleRequestResetPasswordOpen} className={classes.textLink}>Mot de passe perdu ?</Typography>
                      </FormGroup>
                    </form>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.authentication;
    return {
        isLoggedIn
    };
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
}

const connectedLogin = connect(mapStateToProps)(Login);
const connectedLoginWithStyles = withStyles(styles)(connectedLogin);
export { connectedLoginWithStyles as Login };
