import React, { Component } from 'react';
import Tab from '../../common/tab';
import TabContent from './tab-content/TabContent';
import { connect } from 'react-redux';
import Const from './Const';
import './index.scss';
import ScrollComponent from './../../common/ScrollComponent';
import withPreRender from './../../common/withPreRender';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';

class PriceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: Const.tabs.overview,
    };
  }

  changeTab = currentTab => {
    this.setState({ ...this.state, currentTab });
  };

  render() {
    const { currentTab } = this.state;

    return (
      <ScrollComponent>
        <div className="top-nav pt-8 pl-20 pr-20 h-100 d-flex flex-column">
          <Tab
            currentTab={this.state.currentTab}
            listTab="priceData.lstTab"
            changeTab={this.changeTab}
          />
          <div className="tab-content flex-fill d-flex flex-column h-auto">
            <TabContent currentTab={currentTab} id={this.props.id} />
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

export default compose(
  withPreRender(ConstCommon.listComponent.PriceData),
  connect(
    null,
    null,
  ),
)(PriceData);
