import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import PropTypes from 'prop-types';

import './index.scss';
import SwitchTab from './common/switch-tab';
import SearchBox from './common/search-box';
import GroupButton from '../common/header/group-button';
import ScoreBox from './common/score-box';
import Notice from './common/notifications';
import { Export } from './../../common/export';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import MessageHub from '../../../core/signalr/SignalrMessageHub';
import Footer from '../../common/table/Footer';

import { toggleIntro } from '../../app/reducer';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';
import { compose } from 'redux';
import { REDUCER_NAME } from './reducer';

import {
  removeComponent,
  fetchIndustryData,
  changeTab,
  fetchInfoTicker,
  subscribeRealTimeTick,
  fetchCompanyScore,
  setUpData,
} from './reducer';

import { Provider } from '../../common/ComponentIdContext';

import ClickOutsideWrapper from '../../common/check-click-outside';

import FACheckup from './tab-content/FACheckup';
import FinancialRatio from './tab-content/FinancialRatio';
import ZMFScore from './tab-content/ZMFScore';
import ScrollComponent from './../../common/ScrollComponent';

class FinancialAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
    const { id, setUpData } = props;
    setUpData(id);
  }

  handleSwitchTab = currentTab => {
    const { changeTab } = this.props;
    changeTab(currentTab);
    this.setState({ currentTab });
  };

  onReceivePriceData = data => {
    const { searchParams, id, subscribeRealTimeTick } = this.props;
    const code =
      searchParams && Object.keys(searchParams).length
        ? searchParams.code
        : 'AAA';
    subscribeRealTimeTick(id, data, code);
  };

  componentDidMount() {
    const {
      fetchInfoTicker,
      fetchCompanyScore,
      fetchIndustryData,
      id,
      dragCode,
    } = this.props;
    const isFirstTime = true;
    const defaultCode = dragCode ? dragCode.organCode : 'AAA';
    fetchInfoTicker(id, defaultCode);
    fetchCompanyScore(id, defaultCode);
    fetchIndustryData();
    MessageHub.subscribe(ChanelConfig.TickChanel, this.onReceivePriceData);
    if (isFirstTime) {
      // window.addEventListener('load', this.handleLoad);
      // this.handleLoad();
    }
  }
  componentWillUnmount() {
    const { removeComponent, id } = this.props;
    MessageHub.unsubscribe(ChanelConfig.TickChanel, this.onReceivePriceData);
    removeComponent(id);
  }

  render() {
    const { currentTab } = this.state;
    const { id } = this.props;
    return (
      <Provider value={id}>
        <ScrollComponent appendClassName="fa-wrapper">
          <div className="pt-8 pl-20 pr-20 fa-content" id="fa-content">
            <div>
              <SwitchTab handleSwitchTab={this.handleSwitchTab} />
              <div className="fa-top-content">
                <div className="d-flex align-items-center">
                  <SearchBox />
                  <ScoreBox />
                  <GroupButton />
                  <Notice />
                </div>
                {currentTab === 2 && (
                  <div className="align-self-end d-flex">
                    <Export
                      exportId="fa-content-export"
                      exportName="fa-content.png"
                      title={'EXPORT'}
                    />
                  </div>
                )}

                {currentTab === 3 && (
                  <div className="align-self-end d-flex">
                    <Export
                      exportId="zmf-content-export"
                      exportName="zmf-content.png"
                      title={'EXPORT'}
                    />
                  </div>
                )}
              </div>
              <div className="fa-body-content">
                {currentTab === 1 && <FACheckup />}
                {currentTab === 2 && <FinancialRatio />}
                {currentTab === 3 && <ZMFScore />}
              </div>
            </div>
            <div className="fa-footer-content">
              {currentTab === 3 && (
                <div className="d-flex align-items-center">
                  <Footer
                    listTextLang={[
                      {
                        text: I18n.t(`common.table.ZMF_SCORE_TEXT`),
                      },
                    ]}
                  />
                  <a className="unit-title-note ml-2" href="#">
                    click here
                  </a>
                </div>
              )}
            </div>
          </div>
        </ScrollComponent>
      </Provider>
    );
  }
}

FinancialAnalysis.propTypes = {
  joyride: PropTypes.shape({
    callback: PropTypes.func,
  }),
};

FinancialAnalysis.defaultProps = {
  joyride: {},
};

const mapStateToProps = (state, { id }) => {
  return {
    searchParams: state[REDUCER_NAME].listMultiComponent[id].searchParams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // resetCondition: params => dispatch(resetCondition(params)),
    changeTab: tabId => dispatch(changeTab(tabId)),
    fetchInfoTicker: (id, code) => dispatch(fetchInfoTicker(id, code)),
    fetchCompanyScore: (id, code) => dispatch(fetchCompanyScore(id, code)),
    subscribeRealTimeTick: (id, data, code) =>
      dispatch(subscribeRealTimeTick(id, data, code)),
    fetchIndustryData: (data, code) => dispatch(fetchIndustryData(data, code)),
    setUpData: id => dispatch(setUpData(id)),
    removeComponent: id => dispatch(removeComponent(id)),
  };
};

export default compose(
  withPreRender(ConstCommon.listComponent.FinancialAnalysis),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FinancialAnalysis);
