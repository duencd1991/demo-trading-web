import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import Tab from '../../../common/tab-timer';
import DropDownTimeRange from './DropDownTimeRange';
import Financial from './financial/Financial';
import Overview from './overview/Overview';
import Performance from './performance';
import {
  cancelFetchListTopNewLowTable,
  fetchListTopNewLowTable,
} from './reducer';
import Technical from './technical/Technical';
import Chart from './chart/Chart';
import Footer from '../common/TopFooter';

class AllExchanges extends React.Component {
  componentDidMount() {
    const { dispatch, filter, timeRange } = this.props;
    dispatch(fetchListTopNewLowTable(filter, timeRange));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, filter, timeRange } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      dispatch(fetchListTopNewLowTable(filter, timeRange));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(cancelFetchListTopNewLowTable());
  }

  render() {
    const { filter, typeTab, changeType } = this.props;
    return (
      <div className="tab-pane active top-mover-content top-new-low">
        <div className="row w-100">
          <div className="col-12 list-filter top-nav">
            <Tab
              currentTab={typeTab}
              listTab="topVolume.tabDataChange.tabDataChangeTab"
              changeTab={changeType}
            />
            <div className="ml-3">
              <DropDownTimeRange comGroupCode={filter} allExchanges={this} />
            </div>
          </div>
        </div>

        {typeTab === 1 && <Overview />}
        {typeTab === 2 && <Performance />}
        {typeTab === 3 && <Financial />}
        {typeTab === 4 && <Technical />}
        {typeTab === 5 && <Chart />}

        {typeTab !== 5 && (
          <Footer footer={I18n.t('topNewHigh.topNewLowFooter')} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(AllExchanges);
