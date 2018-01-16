import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import { TableHead, TableToolbar, TableBody, TableAddModify } from '../';

//material-ui import
import Table, { TableFooter, TablePagination, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
});

class AppTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: props.columnData[0].id,
      selected: [],
      data: props.data,
      page: 0,
      rowsPerPage: 5,
      openAddModify: false,
      edit: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data){
      this.setState({
        data: nextProps.data,
      });
    }
  }

  handleRequestSort = (e, property) => {
    const orderBy = property;
    let order = 'desc';


    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (e, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n._id).slice(this.state.rowsPerPage * this.state.page, this.state.rowsPerPage * (this.state.page + 1)) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ rowsPerPage: e.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleKeyDown = (e, id) => {
    if (keycode(e) === 'space') {
      this.handleClick(e, id);
    }
  };

  handleClick = (e, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleClickFiltrer = (e) => {
    this.setState({
      order: 'desc',
      orderBy: this.props.columnData[0].id,
    }, () => (this.handleRequestSort(e, this.props.columnData[0].id)));
  }

  handleClickDelete = (e) => {
    this.setState({
      selected : this.state.selected.filter(id => this.props.delete(e, id))
    });
  }

  handleClickUpdateRole = (e, role) => {
    this.setState({
      selected : this.state.selected.filter(id => this.props.updateRole(e, this.state.data.filter(user => id === user._id ? user.role = role : null)[0]))
    });
  }

  handleClickAddModify = (e, edit = false) => {
    this.setState(prevState => ({
      openAddModify: !prevState.openAddModify,
      edit: edit
    }));
  }

  handleAddModify = (e, engine) => {
    if(!this.state.edit){
      this.props.addEngine(e, engine);
    }else{
      this.props.editEngine(e, engine);
    }

  }

  render() {
    let { order, orderBy, selected, data, page, rowsPerPage, openAddModify, edit } = this.state;

    let { columnData, classes, tableName } = this.props;

    const handleRequestSort = this.handleRequestSort;
    const handleSelectAllClick = this.handleSelectAllClick;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = this.handleChangePage;
    const handleChangeRowsPerPage = this.handleChangeRowsPerPage;
    const handleClick = this.handleClick;
    const handleKeyDown = this.handleKeyDown;
    const isSelected = this.isSelected;
    const handleClickFiltrer = this.handleClickFiltrer;
    const handleClickDelete = this.handleClickDelete;

    //user table specific
    const handleClickUpdateRole = this.handleClickUpdateRole;

    //engine table specific
    const handleClickAddModify = this.handleClickAddModify;
    const handleAddModify = this.handleAddModify;
    return (
      <div>
        <TableAddModify columnData={columnData} data={edit && data.filter(data => data._id === selected[0])} open={openAddModify} handleClickAddModify={handleClickAddModify} handleSubmit={handleAddModify}/>
        <TableToolbar tableName={tableName} numSelected={selected.length} handleClickFiltrer={handleClickFiltrer} handleClickDelete={handleClickDelete} handleClickUpdateRole={handleClickUpdateRole} handleClickAddModify={handleClickAddModify}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead
              columnData = {columnData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsPerPage - emptyRows}
            />
            <TableBody
              data={data}
              page={page}
              columnData={columnData}
              rowsPerPage={rowsPerPage}
              handleClick={handleClick}
              handleKeyDown={handleKeyDown}
              isSelected={isSelected}
            />
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  labelRowsPerPage="Ligne par page"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }

}

AppTable.propTypes = {
  tableName: PropTypes.string.isRequired,
  columnData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired,
  data: PropTypes.array,
  updateRole: PropTypes.func,
  addEngine: PropTypes.func,
  editEngine: PropTypes.func,
}

const AppTableWithStyles = withStyles(styles)(AppTable);
export { AppTableWithStyles as AppTable };
