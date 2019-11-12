import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from '../../common/tab';
import ScrollComponent from '../../common/ScrollComponent';
import { REDUCER_NAME, changeTabContent } from './reducer';
import { TABS } from './Const';
import TabContent from './TabContent';
import { compose } from 'redux';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';

class Alerts extends Component {
  componentDidMount() {
    const { changeTabContent } = this.props;
    changeTabContent(TABS.FIINTRADE_RANKING);
  }

  changeTab = currentTab => {
    const { changeTabContent } = this.props;
    changeTabContent(currentTab);
  };
  render() {
    const { currentTab = 1 } = this.props;

    return (
      <ScrollComponent>
        <div className="pl-20 pr-20 pt-8 st_ranking h-100">
          <div className="top-nav d-flex flex-column h-100">
            <Tab
              currentTab={currentTab}
              listTab="alerts.lstTab"
              changeTab={this.changeTab}
            />
            <div className="tab-content tab-content-st-ranking flex-fill d-flex flex-column">
              <TabContent currentTab={currentTab} />
            </div>
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  currentTab: state[REDUCER_NAME].currentTab,
});
const mapDispatchToProps = {
  changeTabContent,
};
export default compose(
  withPreRender(ConstCommon.listComponent.Alerts),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Alerts);
