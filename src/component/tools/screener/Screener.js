import 'rc-slider/assets/index.css';
import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { ChanelConfig } from '../../../configs/GlobalConfig';
//TODO import MessageHub from '../../../core/signalr/SignalrMessageHub';
import Tab from '../../common/tab-timer';
import Footer from '../../common/table/Footer';
import ExportCsv from './export/ExportCsv';
import ScrollComponent from './../../common/ScrollComponent';
import Validation from './../../helpers/Validation';
import Button from './Button';
import Filter from './filter/Filter';
import ScreenerParameter from './filter/ScreenerParameter';
import Financial from './financial/Financial';
import './screener.scss';
import { MyScreener, TopScreener } from './my-screener';
import Performance from './performance/Performance';
import {
  getScreenerData,
  getTopScreeners,
  getUserScreeners,
  REDUCER_NAME,
  saveScreener,
  subscribeRealtimeTick,
  fetchIndustryData,
} from './reducer';
import Result from './result/Result';
import { Popup, Response, Save } from './save';
import Technical from './technical/Technical';
import Const from './Const';
import ConstResult from './result/Const';
import withPreRender from './../../common/withPreRender';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';

class Screener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
    this.nameRef = React.createRef();
  }

  componentDidMount() {
    const { getScreenerData, fetchIndustryData } = this.props;
    getScreenerData();
    fetchIndustryData();
    //TODO MessageHub.subscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  componentDidUpdate(prevProps) {
    const { getScreenerData, fetchIndustryData } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      getScreenerData();
      fetchIndustryData();
    }
  }

  componentWillUnmount() {
    //TODO MessageHub.unsubscribe(ChanelConfig.TickChanel, this.dispatchDataRealtime);
  }

  dispatchDataRealtime = data => {
    const { subscribeRealtimeTick } = this.props;
    subscribeRealtimeTick(data);
  };

  changeTab = currentTab => {
    this.setState({ currentTab });
  };

  applyFilter = () => {
    const { getScreenerData } = this.props;
    getScreenerData();
  };

  saveScreener = name => {
    const validation = new Validation(name);
    const messages = validation.isEmpty().messages;
    if (messages.length === 0) {
      const { saveScreener } = this.props;
      saveScreener(name);
    }
  };

  render() {
    const { totalRecords = 0, selectScreener = {} } = this.props;
    const stringSettings = selectScreener.settings;
    let comGroupCode = Const.defaultWatchList;
    let icbCode = Const.defaultIcbCode;
    let parameters = [];
    let settings = {};
    if (stringSettings) {
      settings = JSON.parse(stringSettings);
      comGroupCode = settings.comGroupCode;
      icbCode = settings.icbCode;
      parameters = settings.parameters;
    }
    const hideColumns = ConstResult.listHideColumn;
    const listColumn = ConstResult.listColumn;

    return (
      <ScrollComponent>
        <div className="screener-wrapper">
          <Popup />
          <Response />
          <div className="top-nav pl-20 pr-20 pt-8">
            <Filter comGroupCode={comGroupCode} icbCode={icbCode} />
            <div className="mt-8 float-right d-inline-flex">
              <span className="mr-5">
                <TopScreener />
              </span>
              <MyScreener />
            </div>
            <div className="criteria-content">
              <ScreenerParameter parameters={parameters} />
              <div className="criteria-button">
                <div className="mt-10 float-right">
                  <span className="mr-5">
                    <Button
                      buttonName={I18n.t('stockScreener.button.APPLY')}
                      onClick={this.applyFilter}
                    />
                  </span>
                  <Save />
                </div>
              </div>
            </div>
            <div className="criteria-result">
              <div className="result-total mb-10">
                {` ${I18n.t('stockScreener.button.result')} (${totalRecords}) `}
              </div>
              <Tab
                currentTab={this.state.currentTab}
                listTab="stockScreener.tab"
                changeTab={this.changeTab}
              />
              <div className="float-right">
                <ExportCsv listColumn={listColumn} hideColumns={hideColumns} />
              </div>
              <div className="clearfix" />
              <div className="result-table top-mover-content">
                {this.state.currentTab === 1 && <Result />}
                {this.state.currentTab === 2 && <Performance />}
                {this.state.currentTab === 3 && <Financial />}
                {this.state.currentTab === 4 && <Technical />}
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    totalRecords: state[REDUCER_NAME].totalRecords,
    userScreener: state[REDUCER_NAME].userScreener,
    topScreener: state[REDUCER_NAME].topScreener,
    selectScreener: state[REDUCER_NAME].selectScreener,
    listIndustry: state[REDUCER_NAME].listIndustry,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getScreenerData: () => dispatch(getScreenerData()),
    fetchIndustryData: () => dispatch(fetchIndustryData()),
    getUserScreeners: () => dispatch(getUserScreeners()),
    getTopScreeners: () => dispatch(getTopScreeners()),
    saveScreener: name => dispatch(saveScreener(name)),
    subscribeRealtimeTick: data => dispatch(subscribeRealtimeTick(data)),
  };
};

export default compose(
  withPreRender(ConstCommon.listComponent.Screener),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Screener);
