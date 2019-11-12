import React from 'react';
import FilterTime from './FilterTime';
import Table from './Table';
import Const from '../Const';
import { connect } from 'react-redux';
import { REDUCER_NAME, fetchListDataTable, fetchInfoTicker } from '../reducer';
import InforIndex from './InforIndex';
import TimeFrame from './TimeFrame';
import ExportCsv from './ExportCsv';
import { isTicker } from '../../../helpers/Common';
import SizeTracker from '../../../common/size-tracker/SizeTracker';
import Footer from './../../../common/table/Footer';

class TabContent extends React.Component {
  componentDidMount() {
    const { fetchInfoTicker, fetchListDataTable, id } = this.props;
    fetchInfoTicker(id);
    fetchListDataTable(id);
  }

  getHideColumns = () => {
    const { indexSumary } = this.props;

    return isTicker(indexSumary)
      ? []
      : [Const.priceDataTableOverview.AVERAGE_PRICE];
  };

  getSchemaKey = () => {
    const { currentTab } = this.props;
    const map = {
      [Const.tabs.overview]: Const.priceDataTableOverview,
      [Const.tabs.orderStatistic]: Const.priceDataTableOrderStatistic,
      [Const.tabs.properietary]: Const.priceDataTableProprietary,
      [Const.tabs.foreign]: Const.priceDataTableForeign,
    };

    return map[currentTab];
  };

  getTableTitle = () => {
    const { currentTab } = this.props;
    const mapTitle = {
      [Const.tabs.overview]: 'priceData.priceDataTableOverview',
      [Const.tabs.orderStatistic]: 'priceData.priceDataTableOrderStatistic',
      [Const.tabs.properietary]: 'priceData.priceDataTableProprietary',
      [Const.tabs.foreign]: 'priceData.priceDataTableForeign',
    };

    return mapTitle[currentTab];
  };

  render() {
    const { id } = this.props;
    const hideColumns = this.getHideColumns();
    const schemaKey = this.getSchemaKey();

    const footerText =
      this.getTableTitle() === 'priceData.priceDataTableOverview'
        ? 'priceData.footerText1'
        : 'priceData.footerText2';

    return (
      <>
        <div className="pd-price-data-wrapper flex-fill d-flex flex-column">
          <div className="pd-top-navigation--left mb-10">
            <InforIndex id={id} />
          </div>
          <div className="pd-top-navigation">
            <div
              className="pd-top-navigation--left list-filter"
              style={{ width: 'auto' }}
            >
              <FilterTime id={id} />
              <TimeFrame id={id} />
            </div>
            <ExportCsv
              schemaKey={schemaKey}
              hideColumns={hideColumns}
              id={id}
            />
          </div>

          <SizeTracker className="flex-fill mt-12">
            {(width, height) => (
              <Table
                height={height}
                hideColumns={hideColumns}
                title={this.getTableTitle()}
                schemaKey={schemaKey}
                id={id}
              />
            )}
          </SizeTracker>
        </div>
        <Footer
          listTextLang={[
            {
              text: footerText,
            },
          ]}
        />
      </>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    isDailyView: state[REDUCER_NAME].isDailyView,
    indexSumary: state[REDUCER_NAME].listMultiComponent[id].indexSumary,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInfoTicker: id => dispatch(fetchInfoTicker(id)),
    fetchListDataTable: id => dispatch(fetchListDataTable(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabContent);
