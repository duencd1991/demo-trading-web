import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
import STTable from './../../../../common/mixTable/STTable';
import Const from './Const';
import ConstCommon from '../../common/Const';
import { I18n } from 'react-redux-i18n';
import withScroll from './../../../../common/withScroll';
import { compose } from 'redux';
class VMGTableRanking extends PureComponent {
  chooseItem = item => {
    console.log(item);
  };

  getDataFromRedux = state => {
    return state[REDUCER_NAME].listValueRankingByTicker;
  };
  render() {
    const {
      isLoading,
      ids,
      table,
      listIndustry,
      listGroup,
      typeRanking,
    } = this.props;
    return (
      <STTable
        ids={ids}
        table={table}
        isLoading={isLoading}
        getDataFromRedux={this.getDataFromRedux}
        schemaKey={
          typeRanking === Const.industry
            ? 'stRanking.fiinTradeRankingsHeader'
            : 'strategy.fiinTradeRankingsHeader'
        }
        listColumn={ConstCommon.listColumn}
        chooseItem={this.chooseItem}
        listIndustry={typeRanking === Const.industry ? listIndustry : listGroup}
      />
    );
  }
}
VMGTableRanking.propTypes = {
  theme: PropTypes.string.isRequired,
  ids: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  ids: state[REDUCER_NAME].listValueRanking,
  listValueRankingByTicker: state[REDUCER_NAME].listValueRankingByTicker,
  listIndustry: state[REDUCER_NAME].listIndustry,
  listGroup: state[REDUCER_NAME].listGroup,
  isLoading: state[REDUCER_NAME].isLoading,
  theme: state.theme,
  i18n: state.i18n,
  typeRanking: state[REDUCER_NAME].typeRanking,
});

const mapDispatchToProps = {};
const enhance = compose(
  withScroll(480, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(VMGTableRanking);
