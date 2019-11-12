import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { DropDown } from '../../../common/dropdown';
import { REDUCER_NAME, fetchListTopForeignTradeTable } from './reducer';

class DropDownNetVol extends React.Component {
  getListDataByKey = () => {
    const data = I18n.t('topForeignTrade.optionList');
    return Object.keys(data).reduce((result, key) => {
      return {
        ...result,
        [key]: { key, name: data[key] },
      };
    }, {});
  };

  onChange = option => {
    const { comGroupCode, fetchListTopForeignTradeTable } = this.props;
    fetchListTopForeignTradeTable(comGroupCode, option);
  };

  render() {
    const { option } = this.props;
    return (
      <div className="line-drop" style={{ 'margin-top': '-10px' }}>
        <DropDown
          listKey={Object.keys(I18n.t('topForeignTrade.optionList'))}
          listDataByKey={this.getListDataByKey()}
          currentKey={option || I18n.t('topForeignTrade.defaultOption')}
          keyTitle={'name'}
          change={this.onChange}
          isEditable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state[REDUCER_NAME].filter,
    option: state[REDUCER_NAME].option,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchListTopForeignTradeTable: (filter, option) =>
      dispatch(fetchListTopForeignTradeTable(filter, option)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownNetVol);
