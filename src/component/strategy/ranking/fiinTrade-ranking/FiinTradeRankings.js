import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { REDUCER_NAME, intervalFetchRanking, changeIdHover } from '../reducer';
import { compose } from 'redux';
import SearchHighlight from '../common/SearchHighlight';
import { Export } from '../../../common/export';
import DropdownIndustry from './DropdownIndustry';
import PopupWarningNoTicker from './PopupWarningNoTicker';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import Table from './Table';

class FiinTradeRankings extends PureComponent {
  state = {
    listConfigTable: Const.listColumn,
    isRankingsIndicators: false,
    previsRankingsIndicators: false,
    classNameRnkIn: 'btn btn-cus-nomal bg-b-color-3 mr-5',
    isShowPopup: false,
    idHover: '',
  };
  clickRankingsIndicators = props => {
    let lstConfig = Const.listColumn;
    let clssName = 'btn btn-cus-nomal bg-b-color-3 mr-5';
    const { isRankingsIndicators } = this.state;
    if (!isRankingsIndicators) {
      lstConfig = Const.listColumnRankingsIndicators;
      // clssName = 'btn btn-cus-nomal mr-5 btn-clicked';
    }
    this.setState({
      isRankingsIndicators: !isRankingsIndicators,
      previsRankingsIndicators: isRankingsIndicators,
      listConfigTable: lstConfig,
      classNameRnkIn: clssName,
      isShowPopup: false,
    });
  };
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
  renderListFilter = () => {
    return (
      <div className="list-filter">
        <SearchHighlight typeSearch={'highlight'} />
        <DropdownIndustry />
      </div>
    );
  };

  renderTable = () => {
    const {
      listConfigTable,
      isRankingsIndicators,
      previsRankingsIndicators,
    } = this.state;
    return (
      <Table
        listConfigTable={listConfigTable}
        isRankingsIndicators={isRankingsIndicators}
        previsRankingsIndicators={previsRankingsIndicators}
      />
    );
  };
  renderButtonRankingsIndicators = () => {
    const { classNameRnkIn, isRankingsIndicators } = this.state;
    return (
      <div className={classNameRnkIn} onClick={this.clickRankingsIndicators}>
        <span className="font-weight-bold">
          {' '}
          {isRankingsIndicators
            ? I18n.t('stRanking.tabChildrens.ranking')
            : I18n.t('stRanking.tabChildrens.rankingIndicators')}
        </span>
      </div>
    );
  };

  render() {
    const { parentRef } = this.props;
    return (
      <div className="tab-content">
        <div className="d-flex w-100 ml-0 mb-10 mr-0 justify-content-between ">
          <div className="">{this.renderListFilter()}</div>
          <div className="mt-2 d-flex export-btn">
            <div className="">{this.renderButtonRankingsIndicators()}</div>
            <Export
              exportId={'rankingExport'}
              exportName={'rankingExport'}
              title={I18n.t('priceDepth.action.export')}
            />
          </div>
        </div>
        <PopupWarningNoTicker parentRef={parentRef} />
        <div className="">{this.renderTable()}</div>
      </div>
    );
  }
}

FiinTradeRankings.propTypes = {
  organCode: PropTypes.string,
  theme: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  organCode: state[REDUCER_NAME].organCode,
  industryId: state[REDUCER_NAME].industryId,
  isLoading: state[REDUCER_NAME].isLoading,
  component: state[REDUCER_NAME].component,
  theme: state.theme,
  i18n: state.i18n,
});

const mapDispatchToProps = {
  intervalFetchRanking,
};
const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(FiinTradeRankings);
