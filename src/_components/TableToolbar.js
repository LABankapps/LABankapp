import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popup } from './';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Menu, { MenuItem } from 'material-ui/Menu';

//material-ui-icon import
import DeleteIcon from 'material-ui-icons/Delete';
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';
import FilterListIcon from 'material-ui-icons/FilterList';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';

const styles = context => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    context.palette.type === 'light'
      ? {
          color: context.palette.secondary.A700,
          backgroundColor: context.palette.secondary.A100,
        }
      : {
          color: context.palette.secondary.A100,
          backgroundColor: context.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: context.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  tooltip: {
    display: 'flex',
  }
});

class TableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorElRoleMenu: null, open: false };
  }

    handleClickAddModify = (e, edit = false) => {
      this.props.handleClickAddModify(e, edit);
    }

    handleRole = (e, role) => {
      this.props.handleClickUpdateRole(e, role);
      this.onClose();
    }

    onOpen = (e) => {
      this.setState({ anchorElRoleMenu: e.currentTarget });
    }

    onClose = () => {
      this.setState({ anchorElRoleMenu: null });
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleRequestClose = () => {
      this.setState({ open: false });
    };

  render() {
    let { numSelected, classes, tableName, handleClickFiltrer, handleClickDelete } = this.props;
    let { anchorElRoleMenu, open } = this.state;

    const onOpen = this.onOpen; //Handle click on role 'open'
    const onClose = this.onClose; //Handle click on role 'close'
    const handleClickOpen = this.handleClickOpen; //Handle click on Avatar 'close'
    const handleRequestClose = this.handleRequestClose;

    //user table specific
    let isUser = tableName === 'Utilisateurs' ? true : false;

    const textMenu = [
      { name: 'Member'},
      { name: 'Dev'},
      { name: 'Admin'},
    ];

    let isRoleMenu = Boolean(anchorElRoleMenu);

    const handleRole = this.handleRole;

    //engine table specific
    let isEngine = tableName === 'Machines' ? true : false;

    const handleClickAddModify = this.handleClickAddModify;
    return(
      <div>
        <Popup open={open} action={handleClickDelete} handleRequestClose={handleRequestClose} title={"Supprimer ?"} message={"Attention, cette action ne peut être annulée."}/>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div className={classes.title}>
            {numSelected > 0 ? (
              <Typography type="subheading">{numSelected} selected</Typography>
            ) : (
              <Typography type="title">{tableName}</Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <div className={classes.tooltip}>
                { isUser ?
                  <div>
                    <Tooltip title="Rôle">
                      <IconButton aria-owns={isRoleMenu ? 'menu-role' : null} onClick={onOpen}>
                        <VerifiedUserIcon/>
                      </IconButton>
                    </Tooltip>
                    <Menu id="menu-role" anchorEl={anchorElRoleMenu}  open={isRoleMenu} onRequestClose={onClose}>
                      {textMenu.map((textMenu) => (
                        <MenuItem key={textMenu.name} onClick={(e) => handleRole(e, textMenu.name)}>
                        {textMenu.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                  :
                  numSelected === 1 && (
                    <Tooltip title="Modifier">
                      <IconButton aria-label="Edit" onClick={(e) => handleClickAddModify(e, true)}>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                  )
                }
                <Tooltip title="Supprimer">
                  <IconButton aria-label="Delete" onClick={handleClickOpen}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div className={classes.tooltip}>
                { isEngine &&
                  <Tooltip title="Ajouter">
                    <IconButton aria-label="Add" onClick={handleClickAddModify}>
                      <AddIcon/>
                    </IconButton>
                  </Tooltip>
                }
                <Tooltip title="Filtre par defaut">
                  <IconButton aria-label="Filter list" onClick={handleClickFiltrer}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </Toolbar>
      </div>
    )
  }
}

TableToolbar.propTypes = {
  tableName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleClickFiltrer: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickUpdateRole: PropTypes.func,
  handleClickAddModifyModify: PropTypes.func,
};

TableToolbar = withStyles(styles)(TableToolbar);
export { TableToolbar };
