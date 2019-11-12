import React from 'react';
import { connect } from 'react-redux';
import Tab from '../../../common/tab-timer';
import Const from './Const';
import TabContent from './tabContent/TabContent';
import ScrollComponent from './../../../common/ScrollComponent';

class FiinTradeStrategy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: Const.tabs.accummulation,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  changeTab = currentTab => {
    this.setState({ ...this.state, currentTab });
  };

  render() {
    const { currentTab } = this.state;
    return (
      // <ScrollComponent>
      // <>
      <div className="tab-pane active">
        <div className="">
          <div className="list-filter">
            <Tab
              currentTab={this.state.currentTab}
              listTab="taStrategy.listTaStrategy"
              changeTab={this.changeTab}
            />
          </div>
        </div>
        <div className="custome-tabs-deceptive">
          <TabContent currentTab={currentTab} />
        </div>
      </div>
      //   {/* </ScrollComponent> */}
      // </>
    );
  }
}

export default connect()(FiinTradeStrategy);
