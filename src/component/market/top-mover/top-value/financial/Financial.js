import React from 'react';
import { I18n } from 'react-redux-i18n';
import Table from './Table';

class Financial extends React.Component {
  render() {
    return (
      <Table listTitle={Object.values(I18n.t('topVolume.financial.financialHeader'))}/>
    );
  }
}

export default Financial;
