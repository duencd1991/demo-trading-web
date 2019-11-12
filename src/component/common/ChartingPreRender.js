import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../app/commonReducer';

const objectLength = obj => !!Object.keys(obj).length;

class ChartingPreRender extends React.PureComponent {
  isRender = () => {
    const {
      listOrganizationByTicker,
      listDerivativeByDerivativeCode,
      listEconomyByEconomyCode,
      listCompanyGroupByComGroupCode,
    } = this.props;
    return (
      objectLength(listOrganizationByTicker) &&
      objectLength(listDerivativeByDerivativeCode) &&
      objectLength(listEconomyByEconomyCode) &&
      objectLength(listCompanyGroupByComGroupCode)
    );
  };

  render() {
    const { children } = this.props;
    return this.isRender() ? children : null;
  }
}

const mapStateToProps = state => ({
  listOrganizationByTicker: state[REDUCER_NAME].listOrganizationByTicker,
  listDerivativeByDerivativeCode:
    state[REDUCER_NAME].listDerivativeByDerivativeCode,
  listEconomyByEconomyCode: state[REDUCER_NAME].listEconomyByEconomyCode,
  listCompanyGroupByComGroupCode:
    state[REDUCER_NAME].listCompanyGroupByComGroupCode,
});

export default connect(mapStateToProps)(ChartingPreRender);
