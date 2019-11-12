import React from 'react';
import moment from 'moment';
import Responsive from '../../common/responsive/Responsive';
import { checkIsBank } from '../../helpers/Common';
import { withComponentId } from './../../common/ComponentIdContext';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFilter, fetchDataSnapshotSearch, REDUCER_NAME } from './reducer';
import { I18n } from 'react-redux-i18n';
import Const from './Const';
import Tab from './../../common/tab-filter';
import MixChart from '../../common/mixChart/MixChart';

const textNull = '--';
const KEY_PREV_ITEM = 'PrevItem';
const _format = require('string-format');
_format.extend(String.prototype, {});
class Chart extends React.Component {
  componentDidMount() {
    const {
      currentSearch = {},
      componentId,
      fetchDataSnapshotSearch,
    } = this.props;
    localStorage.removeItem(KEY_PREV_ITEM);
    fetchDataSnapshotSearch(currentSearch, componentId);
  }

  handleChecked = (key, eventName, isMouseMove) => {
    let prev = localStorage.getItem(KEY_PREV_ITEM);
    key.isMouseMove = isMouseMove;

    const event = new CustomEvent(eventName, { detail: key });
    if (!isMouseMove) {
      localStorage.removeItem(KEY_PREV_ITEM);
      window.dispatchEvent(event);
    } else if (prev !== key.currentItem.category.toString()) {
      localStorage.setItem(KEY_PREV_ITEM, key.currentItem.category);
      window.dispatchEvent(event);
    }
  };

  getDataItemByTimeFilter = dataItem => {
    const { timeFilter } = this.props;

    let data = dataItem.yearly;
    if (timeFilter === 1) {
      data = dataItem.quarterly;
    }

    return data;
  };

  getListBarChart = currentSearch => {
    let data = Const.listBarChart.listBarChartNonBanking;
    if (currentSearch && currentSearch.isBank) {
      data = Const.listBarChart.listBarChartBanking;
    }

    return data;
  };

  renderListBarChart = () => {
    const {
      data = [],
      currentSearch = {},
      component = {},
      componentId: id,
      width,
    } = this.props;
    const unix = moment().unix();

    return data.map((dataItem, index) => {
      const dataChart = this.getDataItemByTimeFilter(dataItem);
      const listBarChart = this.getListBarChart(currentSearch);
      return (
        <div className="cast-chart" key={'cast-chart' + unix + id + index}>
          <Responsive
            component={{
              ...component,
              width: Math.max(component.width, width + 40),
            }}
            key={'component-chart' + unix + id + index}
            margin={10}
            offsetWidth={76}
            XS_SIZE={500}
            scale={{ width: 1, height: 1.2 }}
          >
            {listBarChart.map(item => {
              return (width, height) => (
                <MixChart
                  idComponent={id}
                  data={dataChart}
                  configChart={item.configChart}
                  width={width}
                  height={height}
                  ratio={window.devicePixelRatio}
                  handleChecked={this.handleChecked}
                />
              );
            })}
          </Responsive>
        </div>
      );
    });
  };

  getTitleFinByTimeFilter = () => {
    const { timeFilter } = this.props;
    const { data: dataArr = [], currentSearch = {} } = this.props;

    const { codeName = '' } = currentSearch;

    let title = '';
    dataArr.map(dataItem => {
      let titleFinancialPer = I18n.t('snapShot.titleFinancialPerformanceYear');
      let data = dataItem.yearly;

      if (timeFilter === 1) {
        data = dataItem.quarterly;
        titleFinancialPer = I18n.t('snapShot.titleFinancialPerformanceQuater');
      }
      if (data) {
        title = _format(
          titleFinancialPer,
          codeName,
          data[0].category || textNull,
          data.slice(-1).pop().category || textNull,
        );
      }
    });

    return title;
  };

  changeTab = timeFilter => {
    const { changeFilter, componentId } = this.props;

    changeFilter(timeFilter, componentId);
  };

  render() {
    const { timeFilter = 2 } = this.props;

    return (
      <div className="snapShot-chart">
        <div className="snapShot-FinancialPer">
          <span className="snapShot-titleFinancialPer">
            {this.getTitleFinByTimeFilter()}
          </span>
          <div className="snapShot-FinancialPer-tab">
            <Tab
              disableTabNormal={true}
              currentTab={timeFilter}
              listTab="snapShot.timeTab"
              changeTab={this.changeTab}
            />
          </div>
        </div>
        {this.renderListBarChart()}
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    componentId,
    i18n: state.i18n,
    currentSearch:
      state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
    data: state[REDUCER_NAME].listMultiComponent[componentId].data,
    component: state[REDUCER_NAME].listMultiComponent[componentId].component,
    timeFilter: state[REDUCER_NAME].listMultiComponent[componentId].timeFilter,
  };
};

const mapDispatchToProps = {
  changeFilter,
  fetchDataSnapshotSearch,
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Chart);
