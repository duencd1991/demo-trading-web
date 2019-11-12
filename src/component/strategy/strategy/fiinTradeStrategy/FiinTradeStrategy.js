import React from 'react';
import { connect } from 'react-redux';
import Tab from '../../../common/tab-timer';
import Overview from './overview/Overview';
import Value from './value/Value';
import Growth from './growth/Growth';
import Momentum from './momentum/Momentum';
import VMG from './vmg/VMG';
import Leaders from './leaders/Leaders';
import { REDUCER_NAME, setTypeRanking } from './reducer';
import Const from './Const';
class FiinTradeStrategy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }

  changeType = currentTab => {
    if (currentTab !== this.state.currentTab) {
      this.setState({ ...this.state, currentTab });
      this.props.setTypeRanking(Const.DEFAULT_INDUSTRY);
    }
  };

  render() {
    return (
      <div className="tab-pane active d-flex flex-column">
        <div className="w-100">
          <div className="list-filter top-nav">
            <Tab
              currentTab={this.state.currentTab}
              listTab="strategy.listFiintrade"
              changeTab={this.changeType}
            />
          </div>
        </div>
        {this.state.currentTab === 1 && <Overview />}
        {this.state.currentTab === 2 && <Value />}
        {this.state.currentTab === 3 && <Growth />}
        {this.state.currentTab === 4 && <Momentum />}
        {this.state.currentTab === 5 && <VMG />}
        {this.state.currentTab === 6 && <Leaders />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    typeRanking: state[REDUCER_NAME].typeRanking,
  };
};

const mapDispatchToProps = {
  setTypeRanking,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiinTradeStrategy);
