import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Popup, PriceFormatCustom } from './';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input';

//material-ui-icon import
import DeleteIcon from 'material-ui-icons/Delete';
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';
import FilterListIcon from 'material-ui-icons/FilterList';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import SettingsIcon from 'material-ui-icons/Settings';
import SendIcon from 'material-ui-icons/Send';
import DoneIcon from 'material-ui-icons/Done';
import BuildIcon from 'material-ui-icons/Build';

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
  },
  input: {
    outline: 'none',
    margin: 2,
  }
});

class TableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorElRoleMenu: null, open: false, anchorElMoneyMenu: null, anchorElSkillMenu: null, ecr: '', skill: ''};
  }

    handleClickAddModify = (e, edit = false) => {
      this.props.handleClickAddModify(e, edit);
    }

    handleRole = (e, role) => {
      this.props.handleClickUpdateRole(e, role);
      this.onClose();
    }

    handleChange = (e) => {
      let { name, value } = e.target;
      this.setState({ [name]: value });
    };

    handleMoney = (e) => {
      this.props.handleClickSendMoney(e, this.state.ecr);
      this.onCloseMoney();
    }

    handleSkill = (e) => {
      this.props.handleClickAddSkill(e, this.state.skill);
      this.onCloseSkill();
    }

    onOpen = (e) => {
      this.setState({ anchorElRoleMenu: e.currentTarget });
    }

    onClose = () => {
      this.setState({ anchorElRoleMenu: null });
    }

    onOpenMoney = (e) => {
      this.setState({ anchorElMoneyMenu: e.currentTarget });
    }

    onCloseMoney = () => {
      this.setState({ anchorElMoneyMenu: null, ecr: '' });
    }

    onOpenSkill = (e) => {
      this.setState({ anchorElSkillMenu: e.currentTarget });
    }

    onCloseSkill = () => {
      this.setState({ anchorElSkillMenu: null, skill: '' });
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleRequestClose = () => {
      this.setState({ open: false });
    };

    catchReturn = (e, ) =>{
      let isMoneyMenu = Boolean(this.state.anchorElMoneyMenu);
      if(e.key === 'Enter') { isMoneyMenu ? this.handleMoney(e) : this.handleSkill(e); }
    }

  render() {
    let { numSelected, classes, tableName, handleClickFiltrer, handleClickDelete, handleUpdateRecord } = this.props;
    let { anchorElRoleMenu, open, anchorElMoneyMenu, anchorElSkillMenu } = this.state;

    const onOpen = this.onOpen; //Handle click on role 'open'
    const onClose = this.onClose; //Handle click on role 'close'
    const handleClickOpen = this.handleClickOpen; //Handle click on 'close'
    const handleRequestClose = this.handleRequestClose;
    const onOpenMoney = this.onOpenMoney;
    const onCloseMoney = this.onCloseMoney;
    const onOpenSkill = this.onOpenSkill;
    const onCloseSkill = this.onCloseSkill;

    //user table specific
    let isUser = tableName === 'Utilisateurs' ? true : false;

    const textMenu = [
      { name: 'Member'},
      { name: 'Dev'},
      { name: 'Admin'},
    ];

    let isRoleMenu = Boolean(anchorElRoleMenu);
    let isMoneyMenu = Boolean(anchorElMoneyMenu);
    let isSkillMenu = Boolean(anchorElSkillMenu);

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
                  <div className={classes.tooltip}>
                    <Tooltip title="Rôle">
                      <IconButton aria-owns={isRoleMenu ? 'menu-role' : null} onClick={onOpen}>
                        <VerifiedUserIcon/>
                      </IconButton>
                    </Tooltip>
                    <Menu id="menu-role" anchorEl={anchorElRoleMenu}  open={isRoleMenu} onClose={onClose}>
                      {textMenu.map((textMenu) => (
                        <MenuItem key={textMenu.name} onClick={(e) => handleRole(e, textMenu.name)}>
                        {textMenu.name}
                        </MenuItem>
                      ))}
                    </Menu>
                    <Tooltip title="Ecrou">
                      <IconButton aria-owns={isMoneyMenu ? 'menu-money' : null} onClick={onOpenMoney}>
                        <SettingsIcon/>
                      </IconButton>
                    </Tooltip>
                    <Menu id="menu-money" anchorEl={anchorElMoneyMenu}  open={isMoneyMenu} onClose={onCloseMoney}>
                      <Input
                        onKeyPress={this.catchReturn}
                        className={classes.input}
                        name="ecr"
                        disableUnderline={true}
                        margin={'dense'}
                        placeholder={'nombre d\'écrou à envoyer..'}
                        inputComponent={PriceFormatCustom}
                        value={this.state.ecr}
                        onChange={this.handleChange}
                      />
                      <IconButton onClick={this.handleMoney}>
                        <SendIcon/>
                      </IconButton>
                    </Menu>
                    <Tooltip title="Ajout de compétence">
                      <IconButton aria-owns={isSkillMenu ? 'menu-skill' : null} onClick={onOpenSkill}>
                        <BuildIcon/>
                      </IconButton>
                    </Tooltip>
                    <Menu id="menu-Skill" anchorEl={anchorElSkillMenu}  open={isSkillMenu} onClose={onCloseSkill}>
                      <Input
                        onKeyPress={this.catchReturn}
                        className={classes.input}
                        name="skill"
                        disableUnderline={true}
                        margin={'dense'}
                        placeholder={'Compétence à ajouter..'}
                        value={this.state.skill}
                        onChange={this.handleChange}
                      />
                      <IconButton onClick={this.handleSkill}>
                        <SendIcon/>
                      </IconButton>
                    </Menu>
                  </div>
                  :
                  isEngine && numSelected === 1 && (
                    <Tooltip title="Modifier">
                      <IconButton aria-label="Edit" onClick={(e) => handleClickAddModify(e, true)}>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                  )
                }
                { isEngine || isUser ?
                  <Tooltip title="Supprimer">
                    <IconButton aria-label="Delete" onClick={handleClickOpen}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  :
                  <Tooltip title="Valider" onClick={handleUpdateRecord}>
                    <IconButton aria-label="Validate">
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                }
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
  handleClickSendMoney: PropTypes.func,
  handleClickAddSkill: PropTypes.func,
  handleClickAddModifyModify: PropTypes.func,
  handleUpdateRecord: PropTypes.func,
};

TableToolbar = withStyles(styles)(TableToolbar);
export { TableToolbar };
