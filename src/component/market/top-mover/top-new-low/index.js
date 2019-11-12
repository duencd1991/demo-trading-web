import React from 'react';
import Tab from '../../../common/tab';
import withTabAndRealTime from '../common/withTabAndRealtime';
import { indexMapFilter } from '../Const';
import AllExchanges from './AllExchanges';
import { connect } from 'react-redux';
import { subscribeRealtimeTickTopNewLow } from './reducer';
import ScrollComponent from './../../../common/ScrollComponent';
import { compose } from 'redux';
import withPreRender from '../../../common/withPreRender';
import ConstCommon from './../../../common/Const';

const TopNewLow = ({ indexTab, changeIndex, typeTab, changeType }) => (
  <ScrollComponent>
    <div className="top-nav pl-20 pr-20 pt-8">
      <Tab
        currentTab={indexTab}
        listTab="topVolume.tab"
        changeTab={changeIndex}
      />
      <div className="tab-content">
        <AllExchanges
          key={indexTab}
          typeTab={typeTab}
          changeType={changeType}
          filter={indexMapFilter[indexTab]}
        />
      </div>
    </div>
  </ScrollComponent>
);

const mapDispatchToProps = {
  dispatchRealtime: subscribeRealtimeTickTopNewLow,
};

export default compose(
  withPreRender(ConstCommon.listComponent.TopNewLow),
  connect(
    null,
    mapDispatchToProps,
  ),
  withTabAndRealTime,
)(TopNewLow);
