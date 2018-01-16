import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Stars } from './';

//material-ui import
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

class _TableBody extends Component {
  handleKeyDown = (e, id) => {
    this.props.handleKeyDown(e, id);
  };

  handleClick = (e, id) => {
    this.props.handleClick(e, id);
  };

  render() {
    let { data, rowsPerPage, page, columnData } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    const handleClick = this.handleClick;
    const handleKeyDown = this.handleKeyDown;
    return (
      <TableBody>
        { Object.keys(data).length !== 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
          const isSelected = this.props.isSelected(n._id);
          return (
            <TableRow
              key={n._id}
              hover
              onClick={e => handleClick(e, n._id)}
              onKeyDown={e => handleKeyDown(e, n._id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              selected={isSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
              </TableCell>

              { columnData.map((key) => (
                  <TableCell key={key.id} padding={key.disablePadding ? 'none' : 'default'} numeric={key.numeric}>
                    { key.image && <img src={"data:image/png;base64," + n[key.id]} style={{ width: 25, height: 25 }} title="engine" alt="engine"/> }
                    { key.id === 'level' && <Stars level={n[key.id]} /> }
                    { !key.image && key.id !== 'level' && n[key.id] }
                  </TableCell>
                ))
              }

            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }

}

_TableBody.propTypes = {
  data: PropTypes.array,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  columnData: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export { _TableBody as TableBody };
