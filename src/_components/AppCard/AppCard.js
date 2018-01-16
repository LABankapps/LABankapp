import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CardHeader, CardContent } from '../';
//material-ui import
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 300px))',
    gridGap: context.spacing.unit + 'px',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  card: {
    height: 322,
    display: 'flex',
    flexDirection: 'column',
  },
  flex: {
    display: 'flex',
  }
});

class AppCard extends Component {
  render() {
    let { data, classes } = this.props;

    return (
      <div className={classes.root}>
        {data.map(card => {
          return (
            <Card key={card._id} className={classes.card}>
              <CardHeader title={card.name} price={card.price} image={card.img}
              location={card.location}/>
              <CardContent card={card}/>
            </Card>
          )
        })
      }
    </div>
    );
  }

}

AppCard.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const AppCardWithStyles = withStyles(styles)(AppCard);
export { AppCardWithStyles as AppCard };
