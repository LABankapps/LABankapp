import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import Tabs, { Tab } from 'material-ui/Tabs';

//material-ui-icons import
import PersonPinIcon from 'material-ui-icons/PersonPin';
import BuildIcon from 'material-ui-icons/Build';
import AccountBalanceWalletIcon from 'material-ui-icons/AccountBalanceWallet';

class TabsAccount extends Component {
  handleChange = (e, value) => {
    this.props.tabChange(e, value);
  };

  render() {
    let { tab } = this.props;

    const handleChange = this.handleChange;
    return (
      <Tabs value={tab} onChange={handleChange} centered fullWidth indicatorColor="primary" textColor="primary">
        <Tab icon={<PersonPinIcon />} label="Informations" />
        <Tab icon={<BuildIcon />} label="Compétences" />
        <Tab icon={<AccountBalanceWalletIcon />} label="Tirelire" />
      </Tabs>
    );
  }

}

TabsAccount.propTypes = {
  tab: PropTypes.number.isRequired,
  tabChange: PropTypes.func.isRequired,
};

export { TabsAccount };
