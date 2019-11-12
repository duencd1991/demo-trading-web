import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '../../common/tab';
import Const from './Const';
import Contribution from './contribution';
import Foreign from './foreign/Foreign';
import Proprietary from './proprietary/Proprietary';
import './money-flow.scss';
import { changeComGroupCode } from './reducer';
import ScrollComponent from './../../common/ScrollComponent';
import { compose } from 'redux';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';

const TABS = {
  CONTRIBUTION: 1,
  FOREIGN: 2,
  PROPRIETARY: 3,
};

class MoneyFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: TABS.CONTRIBUTION,
    };
  }

  changeTab = currentTab => {
    const { changeComGroupCode } = this.props;
    if (currentTab === TABS.PROPRIETARY) {
      changeComGroupCode(Const.listFilterByOrganCode.VNINDEX.key);
    }
    this.setState({ currentTab });
  };

  render() {
    const { currentTab } = this.state;

    return (
      <div className="money-flow-wrapper">
        <ScrollComponent>
          <div className="top-nav d-flex flex-column h-100 pt-8 pl-20 pr-20">
            <Tab
              currentTab={currentTab}
              listTab="moneyFlowCommon.tab"
              changeTab={this.changeTab}
            />
            <div className="tab-content flex-fill h-auto d-flex flex-column">
              {currentTab === TABS.CONTRIBUTION && <Contribution />}
              {currentTab === TABS.FOREIGN && <Foreign />}
              {currentTab === TABS.PROPRIETARY && <Proprietary />}
            </div>
          </div>
        </ScrollComponent>
      </div>
    );
  }
}

const mapDispatchToProps = {
  changeComGroupCode,
};

export default compose(
  withPreRender(ConstCommon.listComponent.MoneyFlow),
  connect(
    null,
    mapDispatchToProps,
  ),
)(MoneyFlow);
