import React from 'react';
import { DropDown } from '../../../common/dropdown';
import { connect } from 'react-redux';
import { getDataFollowKeyByDot } from '../../../helpers/Common';
import { cloneDeep, keyBy } from 'lodash';
import Const from './Const';
import { changeIndustryDropDown, REDUCER_NAME } from '../reducer';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';

class DropDownIndustry extends React.Component {
  componentDidMount() {}

  render() {
    const {
      listIndustryByIcbLevel,
      changeIndustryDropDown,
      industryId,
    } = this.props;
    let lstData = listIndustryByIcbLevel ? listIndustryByIcbLevel[1] : [];
    lstData = [...Const.dropList, ...lstData];
    const listIndustryByIcbCode = keyBy(lstData, 'icbCode');
    const listIcbCodeIndustry = lstData.map(item =>
      getDataFollowKeyByDot(item, 'icbCode'),
    );
    return (
      <div className="filter-industry ">
        <DropDown
          keyTitle="icbName"
          listKey={listIcbCodeIndustry}
          listDataByKey={listIndustryByIcbCode}
          currentKey={industryId + ''}
          change={value => {
            changeIndustryDropDown(value);
          }}
          isEditable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    industryType: state[REDUCER_NAME].industryType,
    industryId: state[REDUCER_NAME].industryId,
    listIndustryByIcbLevel: state[COMMON_REDUCER_NAME].listIndustryByIcbLevel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeIndustryDropDown: (industryType, industryId) =>
      dispatch(changeIndustryDropDown(industryType, industryId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownIndustry);
