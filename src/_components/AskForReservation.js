import React from 'react';
import PropTypes from 'prop-types';

//material-ui import
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { red } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import { DateTimePicker } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';
import 'moment/locale/fr';


//material-ui-icons import
import DateRangeIcon from 'material-ui-icons/DateRange';
import NavigateNextIcon from 'material-ui-icons/NavigateNext';
import NavigateBeforeIcon from 'material-ui-icons/NavigateBefore';
import AccessTimeIcon  from 'material-ui-icons/AccessTime';

//styles
const styles = context => ({
  flex:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexC: {
    display: 'flex',
    justifyContent: 'space-arround',
    alignItems: 'center',
    flexDirection: 'column',
    maxHeight: 50,
    overflow: 'auto',
  },
  date: {
    width: 175,
    padding: '0px 8px',
  },
  time: {
    width: 42,
    padding: '0px 8px',
  },
  error: {
    color: red[500],
  }
});

class AskForReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().setSeconds(0),
      duration: new Date().setHours(0,0,0,0)
     };
  }
  handleRequestClose = () => {
    this.props.handleRequestClose();
    this.reset();
  };

  handleRequestValidate = () => {
    this.props.handleRequestClose(this.state.date, this.state.duration, this.props.card);
    this.reset();
  }

  reset = () => {
    this.setState({
       date: new Date().setSeconds(0),
       duration: new Date().setHours(0,0,0,0)
    });
  }

  handleDate = dateTime => {
    this.setState({ date: dateTime })
  }

  handleDuration = dateTime => {
    this.setState({ duration: dateTime })
  }

  render() {
    let { open, card, classes } = this.props;
    let { date, duration } = this.state;

    const handleRequestClose = this.handleRequestClose;
    const handleRequestValidate = this.handleRequestValidate;
    const handleDate = this.handleDate;
    const handleDuration = this.handleDuration;
    return (
        <Dialog open={open} onRequestClose={handleRequestClose}>
          <DialogTitle>Valider la réservation ({card.name})</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez indiquer la date de réservation de la machine {card.name}. (Prix de la réservation : {card.price})
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Réserver :
            </DialogContentText>
            <div className={classes.flex}>
              <DialogContentText>
                Le
              </DialogContentText>
              <DateTimePicker
                className={classes.date}
                ampm={false}
                value={date}
                onChange={handleDate}
                leftArrowIcon={<NavigateBeforeIcon />}
                rightArrowIcon={<NavigateNextIcon />}
                dateRangeIcon={<DateRangeIcon />}
                timeIcon={<AccessTimeIcon />}
                format={'llll'}
              />
              <DialogContentText>
                Durée
              </DialogContentText>
              <TimePicker
                className={classes.time}
                ampm={false}
                value={duration}
                onChange={handleDuration}
                format={'LT'}
              />
              <DialogContentText>
                h
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Créneaux indisponible :
            </DialogContentText>
            <div className={classes.flexC}>
              {
                typeof card.reserved[0] !== 'undefined' ?
                  card.reserved.map((value, key) => {
                    const dateDuration = new Date(new Date(value.date).getTime() + (new Date(value.duration).getHours() * 60 + new Date(value.duration).getMinutes()) * 60000 ).toLocaleString();

                    const dateDurationUser = new Date(new Date(date).getTime() + (new Date(duration).getHours() * 60 + new Date(duration).getMinutes()) * 60000 ).toLocaleString();

                    if(new Date(value.date).toLocaleString() < new Date(date).toLocaleString() && dateDuration <= new Date(date).toLocaleString()){
                      return <DialogContentText key={key}>le {new Date(value.date).toLocaleString().slice(0, -3)} Durée {new Date(value.duration).toLocaleTimeString().slice(0, -3)} h</DialogContentText>
                    }else{
                      if(new Date(value.date).toLocaleString() > new Date(date).toLocaleString() && new Date(value.date).toLocaleString() >= dateDurationUser){
                        return <DialogContentText key={key}>le {new Date(value.date).toLocaleString().slice(0, -3)} Durée {new Date(value.duration).toLocaleTimeString().slice(0, -3)} h</DialogContentText>
                      }else{
                      return <DialogContentText key={key} className={classes.error}>Créneaux déjà utilisé le {new Date(value.date).toLocaleString().slice(0, -3)} Durée {new Date(value.duration).toLocaleTimeString().slice(0, -3)} h, termine le {dateDuration}</DialogContentText>
                      }
                    }
                  }) :
                <DialogContentText>
                  Tous les créneaux sont disponible.
                </DialogContentText>
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRequestClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleRequestValidate} color="accent">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

AskForReservation.propTypes = {
  open: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

AskForReservation.defaultProps = {
  open: false,
};

const AskForReservationWithStyles = withStyles(styles)(AskForReservation);
export { AskForReservationWithStyles as AskForReservation };
