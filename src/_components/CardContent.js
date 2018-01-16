import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { AskForReservation, Stars } from './';
import { engineActions } from '../_actions';

//material-ui import
import { withStyles } from 'material-ui/styles';
import { CardActions, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Tooltip from 'material-ui/Tooltip';

//material-ui-icons import
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import DateRangeIcon from 'material-ui-icons/DateRange';

//styles
const styles = context => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: context.transitions.create('transform', {
      duration: context.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow:{
    flex: '1 0 auto',
  },
  more: {
    overflow: 'auto',
    height: 120,
  }
});

class _CardContent extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, askForReservation: false };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleClickAskForReservation = () => {
    this.setState({ askForReservation: !this.state.askForReservation });
  }

  //this should not be there, error in case of localstorage not found etcccc
  handleRequesAskForReservation = (selectedDateTime = false, selectedDuration = false, card = false) => {
    if(selectedDateTime && selectedDuration && card){
      this.props.dispatch(engineActions.reservation(card, {date: selectedDateTime, duration: selectedDuration, from: this.props.user._id}));
    }

    this.setState({
      askForReservation: false
    });
  }

  render() {
    let { classes, card } = this.props;
    let { expanded, askForReservation } = this.state;
    let { level, comments } = card;

    const handleExpandClick = this.handleExpandClick;
    const handleClickAskForReservation = this.handleClickAskForReservation;
    const handleRequesAskForReservation = this.handleRequesAskForReservation;
    return (
      <div>
        <AskForReservation open={askForReservation} handleRequestClose={handleRequesAskForReservation} card={card}/>
        <CardActions disableActionSpacing>
          <Tooltip title="Réserver" placement='bottom' enterDelay={300}>
            <IconButton aria-label="Date-picker" onClick={handleClickAskForReservation}>
              <DateRangeIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.flexGrow} />
          <Stars level={level} />
          <Tooltip title="En savoir plus" placement='bottom' enterDelay={300}>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent className={classes.more}>
            <Typography paragraph>{comments}</Typography>
          </CardContent>
        </Collapse>
      </div>
    );
  }

}

_CardContent.defaultProps = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user } = typeof state.authentication.user !== 'undefined' ? state.authentication.user : "";
    return {
        user
    };
}

const connectedCardContent = connect(mapStateToProps)(_CardContent);
const connectedCardContentWithStyles = withStyles(styles)(connectedCardContent);
export { connectedCardContentWithStyles as CardContent };
