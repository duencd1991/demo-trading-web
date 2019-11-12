import React from 'react';
import { connect } from 'react-redux';
import Tab from '../../common/tab/Tab';
import TabContent from './TabContent';
import { TABS } from './Const';
import './STRanking.scss';
import ScrollComponent from '../../common/ScrollComponent';
import Footer from './common/Footer';
import { REDUCER_NAME, changeTabContent } from './reducer';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';
import withPreRender from './../../common/withPreRender';

class STRanking extends React.Component {
  componentDidMount() {
    const { changeTabContent } = this.props;
    changeTabContent(TABS.FIINTRADE_RANKING);
  }

  changeTab = currentTab => {
    const { changeTabContent } = this.props;
    changeTabContent(currentTab);
  };
  render() {
    const { currentTab } = this.props;

    return (
      <ScrollComponent>
        <div className="pl-20 pr-20 pt-8 st_ranking h-100">
          <div className="top-nav d-flex flex-column h-100">
            <Tab
              currentTab={currentTab}
              listTab="stRanking.tabs"
              changeTab={this.changeTab}
            />
            <div className="tab-content tab-content-st-ranking flex-fill d-flex flex-column">
              <TabContent currentTab={currentTab} />
            </div>
            <Footer />
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
  withPreRender(ConstCommon.listComponent.STRanking),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(STRanking);
