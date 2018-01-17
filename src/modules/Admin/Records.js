import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { recordActions } from '../../_actions';
import { Loading, AppTable } from '../../_components';
import { setRecordInfo } from '../../_helpers';

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

const getRecordInfo = (records) => {
  let recordsInfo = [];
  records.map((record) => {
    return recordsInfo.push(setRecordInfo(record));
  });
  return recordsInfo.sort((a, b) => ( a.date < b.date ? -1 : 1));
};


class RecordsAdmin extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(recordActions.getAll());

    this.state = {
      data: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items !== this.props.items && typeof nextProps.items !== 'undefined'){
      this.setState({
        data: getRecordInfo(nextProps.items)
      });
    }
  }

  updateRecord = (e, record) => {
    console.log(record);
    //this.props.dispatch(recordActions.update(record));
  }

  render() {
    let { classes, loading } = this.props;
    let { data } = this.state;

    const columnData = [
      { id: 'type', image: false, numeric: false, disablePadding: true, label: 'Type' },
    ];

    console.log(data);

    const updateRecord = this.updateRecord;
    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs>
              <Paper>
                <AppTable tableName="Transactions" columnData={columnData} data={data} updateRecord={updateRecord}/>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

RecordsAdmin.propTypes = {
  records: PropTypes.array,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { loading } = state.users
    const { items } = typeof state.records !== 'undefined' ? state.records : { items: [] };
    return {
        items,
        loading
    };
}

const connectedRecordsAdmin = connect(mapStateToProps)(RecordsAdmin);
const connectedRecordsAdminWithStyles = withStyles(styles)(connectedRecordsAdmin);
export { connectedRecordsAdminWithStyles as RecordsAdmin };
