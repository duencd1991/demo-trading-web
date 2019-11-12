import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FiinTradeRankings from './fiinTrade-ranking/FiinTradeRankings';
import AllScore from './all-score/AllScore';
import { TABS } from './Const';

const tabMap = {
  [TABS.FIINTRADE_RANKING]: FiinTradeRankings,
  [TABS.ALL_SCORE]: AllScore,
};

class TabContent extends PureComponent {
  constructor(props) {
    super(props);
    this.sTRankingRef = React.createRef();
  }

  render() {
    const { currentTab } = this.props;
    const ContentComponent = tabMap[currentTab];
    return (
      <div className="d-flex flex-column flex-fill" ref={this.sTRankingRef}>
        <ContentComponent key={currentTab} parentRef={this.sTRankingRef} />
      </div>
    );
  }
}

TabContent.propTypes = {
  currentTab: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(TabContent);
