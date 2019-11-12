import React from 'react';
import Const from './Const';
import { DropDown } from '../../../common/dropdown';
import { connect } from 'react-redux';
import { changeComGroupCode, fetchListIndustry, REDUCER_NAME } from './reducer';

class DropDownCode extends React.Component {
  componentDidMount() {
    const { fetchListIndustry } = this.props;

    fetchListIndustry();
  }

  componentDidUpdate(prevProps) {
    const { fetchListIndustry } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchListIndustry();
    }
  }

  render() {
    const {
      listCodeIndustry,
      listIndustryByKey,
      comGroupCode,
      changeComGroupCode,
    } = this.props;
    return (
      <DropDown
        keyTitle={Const.listColumnIndustry.ICB_NAME}
        listKey={[...Const.listComGroupCode, ...listCodeIndustry]}
        listDataByKey={{ ...Const.listComGroupCodeByKey, ...listIndustryByKey }}
        currentKey={comGroupCode}
        change={changeComGroupCode}
        isEditable={false}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    comGroupCode: state[REDUCER_NAME].comGroupCode,
    listCodeIndustry: state[REDUCER_NAME].listCodeIndustry,
    listIndustryByKey: state[REDUCER_NAME].listIndustryByKey,
  };
};

const mapDispatchToProps = {
  changeComGroupCode,
  fetchListIndustry,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownCode);
