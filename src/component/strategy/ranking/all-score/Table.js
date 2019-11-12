import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Const from './Const';
import {
  REDUCER_NAME,
  intervalFetchAllScore,
  loadMoreAllScore,
} from '../reducer';
import { compose } from 'redux';
import STTable from './../../../common/mixTable/STTable';
import withScroll from './../../../common/withScroll';
import { I18n } from 'react-redux-i18n';

class FiinTradeAllScoreTable extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: Const.maxRowData,
      rankingId: 1,
      isHover: false,
    };
    this.state = this.initialState;
  }
  componentDidMount() {
    const { intervalFetchAllScore, industryId } = this.props;
    intervalFetchAllScore(industryId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { intervalFetchAllScore, industryId } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      intervalFetchAllScore(industryId);
    }
  }
  getDataFromRedux = state => {
    return state[REDUCER_NAME].listAllScoreByTicker;
  };
  handleScroll = e => {
    const { page } = this.state;
    const { totalPage, ids } = this.props;
    if (page === totalPage) return;
    if (ids.length < Const.maxRowData) return;
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom) {
      this.loadMoreActive();
    }
  };

  convertTextIcon(textIcon) {
    return textIcon.slice(0, textIcon.length);
  }

  loadMoreActive = () => {
    const {
      loadMoreAllScore,
      totalPage,
      organCode,
      industryId,
      isLoading,
      scoreId,
      page,
    } = this.props;
    console.log(totalPage, 'totalPage', page);
    if (page === totalPage || isLoading) return;
    this.setState(() => {
      loadMoreAllScore({
        Page: parseInt(page) + 1,
        Code: industryId,
        scoreId,
      });
    });
  };
  renderTable() {
    const {
      isLoading,
      ids,
      changeIdHover,
      table,
      organCodeHover,
      listConfigTable,
    } = this.props;
    let idHover = organCodeHover;
    if (!ids.includes(organCodeHover) && organCodeHover != '') {
      idHover = '';
    }
    return (
      <STTable
        ids={ids}
        table={table}
        isLoading={isLoading}
        getDataFromRedux={this.getDataFromRedux}
        schemaKey={'stRanking.fiinTradeRankingsHeader'}
        listColumn={listConfigTable}
        isHeaderTable={true}
        titleHeaderTable={I18n.t('stRanking.titleTableAllScore')}
        colorLeft="#2f9db4"
        colorRight="#76dbc7"
        isHighlight={true}
        idHover={idHover}
        changeIdHover={changeIdHover}
        handleScroll={this.handleScroll}
      />
    );
  }
  render() {
    return <>{this.renderTable()}</>;
  }
}
const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    ids: state[REDUCER_NAME].listTickerRanking,
    listAllScoreByTicker: state[REDUCER_NAME].listRankingByTicker,
    listAllScoreLoadMore: state[REDUCER_NAME].listRankingLoadMore,
    industryId: state[REDUCER_NAME].industryId,
    organCodeHover: state[REDUCER_NAME].organCodeHover,
    organCode: state[REDUCER_NAME].organCode,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
    firstPage: state[REDUCER_NAME].firstPage,
    page: state[REDUCER_NAME].page,
    scoreId: state[REDUCER_NAME].scoreId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreAllScore: params => dispatch(loadMoreAllScore(params)),
    intervalFetchAllScore: industryId =>
      dispatch(intervalFetchAllScore(industryId)),
  };
};

const enhance = compose(
  withScroll(149, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(FiinTradeAllScoreTable);
