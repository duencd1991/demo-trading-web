import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { DropDown } from '../../../common/dropdown';
import { REDUCER_NAME, changeFeatureDropDown } from './reducer';
import Const from './Const';
import { SimpleTooltip } from '../../../common/tooltip';

class DropDownNameOfFeature extends React.Component {
  getNameFeatureByKey = key => {
    const data = Const.listFeatureTypeByKey;
    return I18n.t(data[key]['name']);
  };

  onChange = option => {
    const { changeFeatureDropDown } = this.props;
    changeFeatureDropDown(option);
  };

  render() {
    const { featureType } = this.props;
    return (
      <>
        <div className="line-drop mr-10">
          <DropDown
            listKey={Const.listFeatureType}
            listDataByKey={Const.listFeatureTypeByKey}
            currentKey={featureType}
            keyTitle={'name'}
            isI18n={true}
            change={this.onChange}
            isEditable={false}
          />
        </div>
        <div className="name-of-feature">
          {this.getNameFeatureByKey(featureType)}
          <SimpleTooltip
            message={I18n.t('tasignals.tootipNameOfFeature')}
            position="right"
          >
            <i className="icon-info icon-infor-name-of-feature" />
          </SimpleTooltip>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    featureType: state[REDUCER_NAME].featureType,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeFeatureDropDown: featureType =>
      dispatch(changeFeatureDropDown(featureType)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownNameOfFeature);
