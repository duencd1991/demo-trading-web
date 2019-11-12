import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Tab from '../../../common/tab';
import withTabAndRealtime from '../common/withTabAndRealtime';
import { indexMapFilter } from '../Const';
import '../top-mover.scss';
import ScrollComponent from './../../../common/ScrollComponent';
import AllExchanges from './AllExchanges';
import { subscribeRealtimeTickTopVolume } from './reducer';
import withPreRender from '../../../common/withPreRender';
import ConstCommon from './../../../common/Const';

const TopVolume = ({ indexTab, changeIndex, typeTab, changeType }) => (
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
  dispatchRealtime: subscribeRealtimeTickTopVolume,
};

export default compose(
  withPreRender(ConstCommon.listComponent.TopVolume),
  connect(
    null,
    mapDispatchToProps,
  ),
  withTabAndRealtime,
)(TopVolume);
