import React from 'react';
import { connect } from 'react-redux';
import Tab from '../../../common/tab-timer';
import Footer from '../../../common/table/Footer';
import Abnormality from './abnormality/Abnormality';
import Aggressive from './aggressive/Aggressive';
import Cancelled from './cancelled/Cancelled';
import Overview from './overview/Overview';
import { fetchMyWatchList } from './reducer';
import Pressing from './pressing/Pressing';
import Closing from './closing/Closing';

class Deceptive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }
  changeTab = currentTab => {
    this.setState({ ...this.state, currentTab });
  };

  render() {
    return (
      <div className="tab-pane active deceptive-wrapper">
        <div className="row">
          <div className="list-filter">
            <Tab
              currentTab={this.state.currentTab}
              listTab="tasignals.deceptiveTab"
              changeTab={this.changeTab}
            />
          </div>
        </div>
        <div className="custome-tabs-deceptive">
          {this.state.currentTab === 1 && <Overview />}
          {this.state.currentTab === 2 && <Abnormality />}
          {this.state.currentTab === 3 && <Cancelled />}
          {this.state.currentTab === 4 && <Pressing />}
          {this.state.currentTab === 5 && <Aggressive />}
          {this.state.currentTab === 6 && <Closing />}
          <div className="tab-pane active" role="tabpanel">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMyWatchList: () => dispatch(fetchMyWatchList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Deceptive);
