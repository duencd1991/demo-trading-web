import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { REDUCER_NAME, changeIdHover } from '../reducer';
import STTable from './../../../common/mixTable/STTable';
import Const from './Const';
import PopupWarning from './../../../common/popup-portal/popup-warning/PopupWarning';
import SearchHighlight from '../common/SearchHighlight';
import { I18n } from 'react-redux-i18n';
import { compose } from 'redux';
import Table from './Table';
import PopupWarningNoTicker from './PopupWarningNoTicker';
class AllScore extends PureComponent {
  state = {
    listConfigTable: Const.listColumn,
    isRankingsIndicators: false,
    previsRankingsIndicators: false,
    classNameRnkIn: 'btn btn-cus-nomal bg-b-color-3 mr-5',
    isShowPopup: false,
    idHover: '',
  };
  clickFilter = props => {
    let lstConfig = Const.listColumn;
    let clssName = 'btn btn-cus-nomal bg-b-color-3 mr-5';
    const { isRankingsIndicators } = this.state;
    if (!isRankingsIndicators) {
      lstConfig = Const.listColumnRankingsIndicators;
      clssName = 'btn btn-cus-nomal mr-5 btn-clicked';
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
  componentDidUpdate(prevProps, prevState) {
    // const { organCodeHover, ids } = this.props;
    // let isShowPopup = false;
    // let idHover = organCodeHover;
    // if (!ids.includes(organCodeHover) && organCodeHover != '') {
    //   idHover = '';
    //   isShowPopup = true;
    // }
    // if (
    //   organCodeHover !== prevProps.organCodeHover &&
    //   this.state.isRankingsIndicators === this.state.isRankingsIndicators
    // ) {
    //   this.setState({ isShowPopup: isShowPopup, idHover: idHover });
    // }
  }

  renderListFilter = () => {
    return (
      <div className="list-filter">
        <SearchHighlight typeSearch={'highlight'} />
        <div className="btn btn-cus-nomal bg-b-color-3 mr-5">
          <span className="font-weight-bold">
            {I18n.t('stRanking.tabChildrens.all')}
          </span>
        </div>
        <div className="btn btn-cus-nomal bg-b-color-3 mr-5">
          <span className="font-weight-bold">
            {I18n.t('stRanking.tabChildrens.hose')}
          </span>
        </div>
        <div className="btn btn-cus-nomal bg-b-color-3 mr-5">
          <span className="font-weight-bold">
            {I18n.t('stRanking.tabChildrens.hnx')}
          </span>
        </div>
      </div>
    );
  };

  renderTable = () => {
    const {
      listConfigTable,
      isRankingsIndicators,
      previsRankingsIndicators,
    } = this.state;
    return <Table listConfigTable={Const.listColumn} />;
  };
  render() {
    const { parentRef } = this.props;
    return (
      <div className="tab-content">
        <div className="d-flex w-100 ml-0 mb-10 mr-0 justify-content-between ">
          <div className="">{this.renderListFilter()}</div>
          <div className="mt-2 export-btn">
            <div className="btn btn-cus-nomal bg-b-color-3">
              <i className="icon-printer-tool" />
              <span className="font-weight-bold">
                {I18n.t('priceDepth.action.export')}
              </span>
            </div>
          </div>
        </div>
        <PopupWarningNoTicker parentRef={parentRef} />
        <div className="">{this.renderTable()}</div>
      </div>
    );
  }
}

AllScore.propTypes = {
  organCode: PropTypes.string,
  organCodeHover: PropTypes.string,
  theme: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  ids: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  ids: state[REDUCER_NAME].listTickerRanking,
  organCode: state[REDUCER_NAME].organCode,
  isLoading: state[REDUCER_NAME].isLoading,
  theme: state.theme,
  i18n: state.i18n,
});

const mapDispatchToProps = {};
const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);
export default enhance(AllScore);
