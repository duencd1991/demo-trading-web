import React, { Component } from 'react';

import ScrollComponent from './../common/ScrollComponent';
import ExpertView from './tab-content/expert-view';
import NewsAggregator from './tab-content/news-aggregator';
import AutoNews from './tab-content/auto-news';
import PremiumAnalysis from './tab-content/premium-analysis';
import Rumors from './tab-content/rumors';
import SwitchTab from './common/switch-tab';
import TabHeader from './tab-header';
import {
  REDUCER_NAME,
  changeTab,
  setFilterCondition,
  setAPIParams,
} from './reducer';
import { connect } from 'react-redux';
import Const from './Const';
import ConstCommon from './../common/Const';
import withPreRender from './../common/withPreRender';
import { compose } from 'redux';

class newsAnalysis extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  handleSwitchTab = (currentTab, type) => {
    const { changeTab } = this.props;
    changeTab(type, currentTab);
  };

  componentDidMount() {}

  resetScroll = () => {
    // console.log(this.divRef)
    this.divRef.current.scrollTop(250);
  };

  handleScroll = e => {
    const {
      setAPIParams,
      currentTab,
      currentChildTab,
      contributorsData,
    } = this.props;
    const {
      totalPage,
      apiParams: { Page },
    } = contributorsData;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) <=
      e.target.clientHeight;

    const top = e.target.scrollTop === 0;

    let newPage = null;

    if (bottom) {
      console.log('bottom');
      if (Page >= totalPage) return;
      newPage = Page + 1;
      setAPIParams(
        { parentTab: currentTab, childTab: currentChildTab },
        { Page: newPage },
      );
      this.resetScroll();
    }

    if (top) {
      console.log('on the top');
      if (Page === 1) return;
      newPage = Page - 1;
      setAPIParams(
        { parentTab: currentTab, childTab: currentChildTab },
        { Page: newPage },
      );
      this.resetScroll();
    }
  };

  render() {
    const {
      currentTab,
      currentChildTab,
      contributorsData: {
        currentExpert: { expertId, newId },
      },
    } = this.props;
    let optionProps = {};

    if (currentTab === 4 && currentChildTab === 3 && !expertId) {
      optionProps.appendHandleScroll = this.handleScroll;
    }

    return (
      <ScrollComponent {...optionProps} scrollRef={this.divRef}>
        <div className="pt-8 pl-20 pr-20" id="fa-content">
          <SwitchTab handleSwitchTab={this.handleSwitchTab} />
          <div className="na-top-content">
            <TabHeader
              currentTab={currentTab}
              handleSwitchTab={this.handleSwitchTab}
              currentDataGetFrom={
                currentTab !== 4
                  ? Const.TAB_MAPPING[currentTab]
                  : Const.TAB_MAPPING[currentTab][currentChildTab]
              }
            />
          </div>
          <div className="na-body-content">
            {currentTab === 1 && <NewsAggregator />}
            {currentTab === 2 && <AutoNews />}
            {currentTab === 3 && <PremiumAnalysis />}
            {currentTab === 4 && (
              <ExpertView currentChildTab={currentChildTab} />
            )}
            {currentTab === 5 && <Rumors />}
          </div>
          <div className="na-footer-content" />
        </div>
      </ScrollComponent>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: state[REDUCER_NAME].currentTab,
  currentChildTab: state[REDUCER_NAME].currentChildTab,
  contributorsData: state[REDUCER_NAME].contributorsData,
});

const mapDispatchToProps = dispatch => {
  return {
    changeTab: (type, tabNumber) => dispatch(changeTab(type, tabNumber)),
    setAPIParams: (tab, params) => dispatch(setAPIParams(tab, params)),
    setFilterCondition: (tabType, tabNumber) =>
      dispatch(setFilterCondition(tabType, tabNumber)),
  };
};

export default compose(
  withPreRender(ConstCommon.listComponent.News),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(newsAnalysis);
