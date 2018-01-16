import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Loading, Dialog } from '../../_components';
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
  leftIcon: {
    marginRight: context.spacing.unit,
  },
});

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false,
            showPassword: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    handleClickShowPasssword = (e) => {
      this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (e) => {
      e.preventDefault();
    }

    render() {
        let { registering, classes  } = this.props;
        let { user, submitted, showPassword } = this.state;

        let handleMouseDownPassword = this.handleMouseDownPassword;
        let handleClickShowPasssword = this.handleClickShowPasssword;
        let handleChange = this.handleChange;
        let handleSubmit = this.handleSubmit;
        return (
          <div>
            { registering && <Loading className={classes.formControl} mode="query"/>}
            <div className={classes.root}>
              <Grid container spacing={40} className={classes.container}>
                <Grid item xs className={classes.item}>
                  <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit} className={classes.form} autoComplete="register">
                      <FormGroup className={classes.formGroup}>
                        <Dialog className={classes.title} message="S'enregistrer !" style={theme.getRowStyle('white', 'primaryColor')} type="headline"/>
                      </FormGroup>
                      <FormControl fullWidth className={classes.firstInputControl}>
                        <InputLabel htmlFor="lastName">Nom</InputLabel>
                        <Input name="lastName" type="text" value={user.lastName} onChange={handleChange} />
                        {submitted && !user.lastName &&
                          <Dialog message="lastName is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                        }
                      </FormControl>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="firstName">Prénom</InputLabel>
                        <Input name="firstName" type="text" value={user.firstName} onChange={handleChange} />
                        {submitted && !user.firstName &&
                          <Dialog message="firstName is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                        }
                      </FormControl>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input name="email" readOnly onFocus={(e) => e.target.readOnly = false} autoComplete="register-email" type="email" value={user.email} onChange={handleChange} />
                        {submitted && !user.email &&
                          <Dialog message="Email is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                        }
                      </FormControl>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" readOnly onFocus={(e) => e.target.readOnly = false}  autoComplete={'register-password'} type={showPassword ? 'text' : 'password'} value={user.password} onChange={handleChange} endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPasssword} onMouseDown={handleMouseDownPassword}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>}/>
                        {submitted && !user.password &&
                          <Dialog message="Password is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                        }
                      </FormControl>
                      <FormGroup className={classes.formGroup}>
                        <Button className={classes.button} type="submit" raised color="primary">
                          Inscriptions
                          <Send className={classes.rightIcon}/>
                        </Button>
                        <Link to="/login" className={classes.textLink}><Typography className={classes.textLink}>Se connecter ?</Typography></Link>
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
    const { registering } = state.registration;
    return {
        registering
    };
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
}

const connectedRegister = connect(mapStateToProps)(Register);
const connectedRegisterWithStyles = withStyles(styles)(connectedRegister);
export { connectedRegisterWithStyles as Register };
