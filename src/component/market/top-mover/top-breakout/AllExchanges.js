import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import Tab from '../../../common/tab-timer';
import Footer from '../../../common/table/Footer';
import '../top-mover.scss';
import './index.scss';
import DropDownRate from './DropDownRate';
import DropDownTimeRange from './DropDownTimeRange';
import Financial from './financial/Financial';
import Overview from './overview/Overview';
import Performance from './performance';
import {
  applyFilter,
  cancelFetchTopBreakoutTable,
  fetchListTopBreakoutData,
} from './reducer';
import Technical from './technical/Technical';
import Chart from './chart/Chart';

class AllExchanges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClass: 'btn btn-cus-nomal bg-b-color-3 ml-10 apply-btn',
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonUp = this.handleButtonUp.bind(this);
  }

  componentDidMount() {
    const { dispatch, filter } = this.props;
    dispatch(fetchListTopBreakoutData(filter));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, filter } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      dispatch(fetchListTopBreakoutData(filter));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(cancelFetchTopBreakoutTable());
  }

  filterApplyClick = () => {
    const { dispatch, filter } = this.props;
    dispatch(applyFilter(filter));
  };

  handleButtonPress() {
    this.setState({
      buttonClass: 'btn active btn-cus-nomal bg-b-color-3 ml-10 apply-btn',
    });
  }

  handleButtonUp() {
    this.setState({
      buttonClass: 'btn btn-cus-nomal bg-b-color-3 ml-10 apply-btn',
    });
  }

  render() {
    const { filter, typeTab, changeType } = this.props;
    return (
      <div className="tab-pane active top-mover-content top-breakout">
        <div className="w-100">
          <div className="list-filter top-nav">
            <Tab
              currentTab={typeTab}
              listTab="topVolume.tabDataChange.tabDataChangeTab"
              changeTab={changeType}
            />
          </div>
        </div>
        <div className="float-left">
          <div className="list-filter mb-10 date-top-breakout">
            <span className="label-span first">
              {I18n.t('topBreakout.filterContent.part_1')}
            </span>
            <div className="line-drop">
              <DropDownTimeRange comGroupCode={filter} />
            </div>
            <span className="label-span last ml-10 mr-5">
              {I18n.t('topBreakout.filterContent.part_2')}
            </span>
            <div className="line-drop">
              <DropDownRate comGroupCode={filter} />
            </div>
            <div
              onMouseDown={this.handleButtonPress}
              onMouseUp={this.handleButtonUp}
              className={this.state.buttonClass}
              onClick={this.filterApplyClick}
            >
              {I18n.t('topBreakout.filterContent.apply')}
            </div>
          </div>
        </div>
        <div className="clearfix" />
        {typeTab === 1 && <Overview />}
        {typeTab === 2 && <Performance />}
        {typeTab === 3 && <Financial />}
        {typeTab === 4 && <Technical />}
        {typeTab === 5 && <Chart />}
        <div className="clearfix" />

        {typeTab !== 5 && <Footer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(AllExchanges);
