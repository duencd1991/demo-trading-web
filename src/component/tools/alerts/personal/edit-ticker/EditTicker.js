import React from 'react';
import './index.scss';
import {
  REDUCER_NAME,
  changeConditionType,
  toogleEditSetting,
  addPersonalAlert,
} from '../../reducer';
import { connect } from 'react-redux';
import DropDown from './../../../../common/dropdown/DropDown';
import { I18n } from 'react-redux-i18n';
import _ from 'lodash';
import SearchBox from '../../common/SearchBox';

class EditTicker extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { changeConditionType, conditionType } = this.props;
    changeConditionType(conditionType);
  }
  savePersonalEdit = () => {
    console.log(this.props, 'this.props');
    const { addPersonalAlert } = this.props;
    addPersonalAlert();
  };
  render() {
    const {
      listConditionIds,
      listConditionsByKey,
      changeConditionType,
      listCriteriasId,
      listCriteriaByKey,
      conditionType,
      criteriaType,
      handleShowEdit,
      currentItemSearch,
    } = this.props;
    return (
      <div className="edit-setting-personal">
        <div className="list-filter mb-5">
          <SearchBox />
        </div>
        <div className="body-setting-personal d-flex flex-row mt-5 ">
          <div className="body-col-content d-flex flex-column">
            <div className="body-row-content">
              <span className="text-transparent text-font-weight ">
                {I18n.t('alertPersonal.editSetting.applyTo')}
                <span className="text-font-weight">
                  {currentItemSearch ? currentItemSearch.ticker : ''}{' '}
                </span>
              </span>
            </div>
            <div className="body-row-content">
              <span className="text-font-weight">
                {I18n.t('alertPersonal.editSetting.conditions')}
              </span>
            </div>
            <div className="body-row-content">
              <div className="line-drop condition-drop-down mr-5">
                <DropDown
                  listKey={listConditionIds}
                  listDataByKey={listConditionsByKey}
                  currentKey={conditionType || _.head(listConditionIds)}
                  keyTitle={'name'}
                  change={value => changeConditionType(value)}
                  isI18n={true}
                />
              </div>
              <div className="line-drop condition-drop-down mr-5 ml-5">
                <DropDown
                  listKey={listCriteriasId}
                  listDataByKey={listCriteriaByKey}
                  currentKey={criteriaType || _.head(listCriteriasId)}
                  keyTitle={'name'}
                  //  change={value => changeConditionType(value)}
                  isI18n={true}
                />
              </div>
            </div>
          </div>
          <div className="body-col-content d-flex flex-column">
            <div className="body-row-content">
              <span className="text-font-weight">
                {I18n.t('alertPersonal.editSetting.notificationPreferences')}
              </span>
            </div>
            <div className="body-row-content">
              <div className="radio-alert-setting-personal">
                <div className="checkbox  text-transparent">
                  <input
                    value="1"
                    id="1"
                    type="checkbox"
                    name="notificationPreferences"
                    style={{ cursor: 'pointer' }}
                  />
                  <label className="text-transparent text-font-weight">
                    {I18n.t('alertPersonal.editSetting.notifications')}
                  </label>
                </div>
                <div className="checkbox ">
                  <input
                    value="2"
                    id="2"
                    type="checkbox"
                    name="notificationPreferences"
                    style={{ cursor: 'pointer' }}
                  />
                  <label className="text-transparent">
                    {I18n.t('alertPersonal.editSetting.email')}
                  </label>
                </div>
              </div>
            </div>
            <div className="body-row-content">
              <button
                className="btn-remove-delete"
                onClick={() => this.savePersonalEdit()}
              >
                {I18n.t('common.button.save')}
              </button>
              <button className="btn-remove-cancel" onClick={handleShowEdit}>
                {I18n.t('common.button.cancel')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isShowEditSetting: state[REDUCER_NAME].isShowEditSetting,
    fetchListPersonalAlertTypes:
      state[REDUCER_NAME].fetchListPersonalAlertTypes,
    listConditionsByKey: state[REDUCER_NAME].listConditionsByKey,
    listConditionIds: state[REDUCER_NAME].listConditionIds,
    listCriteriaByKey: state[REDUCER_NAME].listCriteriaByKey,
    listCriteriasId: state[REDUCER_NAME].listCriteriasId,
    conditionType: state[REDUCER_NAME].conditionType,
    criteriaType: state[REDUCER_NAME].criteriaType,
    currentItemSearch: state[REDUCER_NAME].currentItemSearch,
    i18n: state.i18n,
  };
};
const mapDispatchToProps = {
  toogleEditSetting,
  changeConditionType,
  addPersonalAlert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTicker);
