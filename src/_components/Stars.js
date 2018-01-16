import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import { yellow } from 'material-ui/colors';

//material-ui-icons import
import StarBorderIcon from 'material-ui-icons/StarBorder';
import StarIcon from 'material-ui-icons/Star';
import StarHalfIcon from 'material-ui-icons/StarHalf';

//styles
const styles = context => ({
  stars: {
    color: yellow['A700'],
    display: 'flex',
    flexWrap: 'nowrap',
  },
  padding: {
    padding: 10,
  },
  star: {
    height: 24,
    cursor: 'pointer',
  }
});

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stars: this.calcStars(props.level), curleft: 0, isListening: false};
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ stars: this.calcStars(nextProps.level) });
  }

  calcStars = (level) => {
    let stars = Array(3);
    let numberOfStars = Math.floor(level / 2);
    let numberOfHalfStars = level % 2;

    stars.fill(<StarIcon />, 0, numberOfStars);
    stars.fill(<StarHalfIcon />, numberOfStars, (numberOfStars + numberOfHalfStars));
    stars.fill(<StarBorderIcon />, (numberOfStars + numberOfHalfStars), 3);

    return stars;
  }

  findPos = (obj) => {
  	let curleft = 0;
    obj = obj.target;

  	if (obj.offsetParent) {
  		do {
  			curleft += obj.offsetLeft;
        obj = obj.offsetParent
  		} while (obj);
  	}

  	this.setState({ curleft: curleft });
  }

  handleChange = (e) => {
    this.props.handleLevelChange(Math.round((e.pageX - this.state.curleft) / 12));
  }

  startListening = () => {
    this.setState(prevState => ({
      isListening: !prevState.isListening
    }));
  }

  render() {
    let { stars, isListening } = this.state;
    let { classes, level, handleLevelChange } = this.props;

    const handleChange = this.handleChange;
    const findPos = this.findPos;
    const startListening = this.startListening;
    return (
      <Tooltip title={`Niveau ${level > 2 ? level > 4 ? 'Confirmé': 'Intermédiaire': 'Débutant'}`} placement='bottom' enterDelay={300}>
        <div className={classnames(classes.stars, {
        [classes.padding]  : Boolean(handleLevelChange),
      })} onMouseEnter={findPos} onMouseOver={(e) => Boolean(handleLevelChange) && isListening  && handleChange(e)} onClick={startListening}>
          {
            stars.map((value, key) => (
              <span className={classes.star} key={key}>
                {value}
              </span>
            ))
          }
        </div>
      </Tooltip>
    );
  }

}

Stars.propTypes = {
  level: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  handleLevelChange: PropTypes.func,
};

Stars.defaultProps = {
  level: 0
};

const StarstWithStyles = withStyles(styles)(Stars);
export { StarstWithStyles as Stars };
