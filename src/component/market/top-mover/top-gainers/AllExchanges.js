import React from 'react';
import { connect } from 'react-redux';
import Tab from '../../../common/tab-timer';
import Financial from './financial/Financial';
import Overview from './overview/Overview';
import Performance from './performance';
import {
  cancelFetchListTopGainerTable,
  fetchListTopGainerTable,
} from './reducer';
import Technical from './technical/Technical';
import Chart from './chart/Chart';
import Footer from '../../../common/table/Footer';

class AllExchanges extends React.Component {
  componentDidMount() {
    const { dispatch, filter } = this.props;
    dispatch(fetchListTopGainerTable(filter));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, filter } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      dispatch(fetchListTopGainerTable(filter));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(cancelFetchListTopGainerTable());
  }

  render() {
    const { typeTab, changeType } = this.props;
    return (
      <div className="tab-pane active top-mover-content">
        <div className="w-100">
          <div className="list-filter top-nav">
            <Tab
              currentTab={typeTab}
              listTab="topVolume.tabDataChange.tabDataChangeTab"
              changeTab={changeType}
            />
          </div>
        </div>
        {typeTab === 1 && <Overview />}
        {typeTab === 2 && <Performance />}
        {typeTab === 3 && <Financial />}
        {typeTab === 4 && <Technical />}
        {typeTab === 5 && <Chart />}

        {typeTab !== 5 && <Footer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(AllExchanges);
