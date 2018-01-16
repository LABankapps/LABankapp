import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";

import { engineActions } from '../../_actions';
import { Loading, AppTable } from '../../_components';
import { setEngineInfo } from '../../_helpers';

//Material-ui import
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
  root: {
      padding: 20,
      marginTop: context.spacing.unit * 3,
    },
});

const getEnginesInfo = (engines) => {
  let EnginesInfo = [];
  engines.map((engine) => {
    return EnginesInfo.push(setEngineInfo(engine));
  });
  return EnginesInfo.sort((a, b) => ( a.name < b.name ? -1 : 1));
}

class EnginesAdmin extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(engineActions.getAll());

    this.state = {
      data: [],
      endpoint: "http://localhost:8000/"
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items !== this.props.items && typeof nextProps.items !== 'undefined'){
      this.setState({
        data: getEnginesInfo(nextProps.items)
      });
    }
  }

  deleteEngine = (e, id) => {
    this.props.dispatch(engineActions.delete(id));
    this.emitChange();
  }

  addEngine = (e, engine) => {
    this.props.dispatch(engineActions.create(engine, engine.file));
    this.emitChange();
  }

  editEngine = (e, engine) => {
    this.props.dispatch(engineActions.update(engine, engine.file));
    this.emitChange();
  }

  emitChange = () =>{
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('engines', { for: 'everyone' });
  }

  render() {
    let { classes, loading } = this.props;
    let { data } = this.state;

    const columnData = [
      { id: 'name', image: false, numeric: false, disablePadding: false, label: 'Nom', required: true, multiline: false },
      { id: 'img', image: true, numeric: false, disablePadding: true, label: 'Image', required: false, multiline: false },
      { id: 'price', image: false, numeric: true, disablePadding: false, label: 'Prix', required: true, multiline: false },
      { id: 'level', image: false, numeric: false, disablePadding: false, label: 'Niveau', required: true, multiline: false },
      { id: 'comments', image: false, numeric: false, disablePadding: true, label: 'Commentaires', required: false, multiline: true },
      { id: 'location', image: false, numeric: false, disablePadding: true, label: 'Lieux', required: false, multiline: false },
    ];

    const deleteEngine = this.deleteEngine;
    const addEngine = this.addEngine;
    const editEngine = this.editEngine;
    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs>
              <Paper>
                <AppTable tableName="Machines" columnData={columnData} data={data} delete={deleteEngine} addEngine={addEngine} editEngine={editEngine}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

EnginesAdmin.propTypes = {
  engines: PropTypes.array,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { loading } = state.engines
    const { items } = typeof state.engines !== 'undefined' ? state.engines : { items: [] };
    return {
        items,
        loading
    };
}

const connectedEnginesAdmin = connect(mapStateToProps)(EnginesAdmin);
const connectedEnginesAdminWithStyles = withStyles(styles)(connectedEnginesAdmin);
export { connectedEnginesAdminWithStyles as EnginesAdmin };
