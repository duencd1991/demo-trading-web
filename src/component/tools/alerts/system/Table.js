import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Const from './Const';
import ConstParent from '../Const';
import {
  REDUCER_NAME,
  fetchAlertSystem,
  loadMoreAlertSystem,
} from '../reducer';
import { compose } from 'redux';
import STTable from './../../../common/mixTable/STTable';
import withScroll from './../../../common/withScroll';

class AlertSystemTable extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: Const.maxRowData,
      alertSystemId: 1,
      isHover: false,
    };
    this.state = this.initialState;
  }

  toggleHover = isHover => {
    this.setState({ ...this.state, isHover });
  };

  componentDidMount() {
    this.props.fetchAlertSystem();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps && prevProps.organCode !== this.props.organCode) ||
      prevProps.i18n.locale !== this.props.i18n.locale
    ) {
      this.props.fetchAlertSystem(this.props.organCode);
    }
  }

  getDataFromRedux = state => {
    return state[REDUCER_NAME].listAlertSystemByTicker;
  };
  handleScroll = e => {
    const { page } = this.state;
    const { totalPage } = this.props;
    if (page === totalPage) return;
    if (this.props.ids.length < Const.maxRowData) return;
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
      loadMoreAlertSystem,
      totalPage,
      organCode,
      isLoading,
      alertSystemId,
      page,
    } = this.props;
    if (page === totalPage || isLoading) return;
    this.setState(() => {
      loadMoreAlertSystem({
        Page: parseInt(page) + 1,
        OrganCode: organCode,
        alertSystemId,
      });
    });
  };

  render() {
    const { isLoading, ids, table } = this.props;
    return (
      <STTable
        ids={ids}
        table={table}
        isLoading={isLoading}
        getDataFromRedux={this.getDataFromRedux}
        handleScroll={this.handleScroll}
        schemaKey={'alertSystem.alertSystemHeader'}
        listColumn={Const.listColumn}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    ids: state[REDUCER_NAME].listTickerAlertSystem,
    listAlertSystemByTicker: state[REDUCER_NAME].listAlertSystemByTicker,
    isShowPopupSetting: state[REDUCER_NAME].isShowPopupSetting,
    listAlertSystemLoadMore: state[REDUCER_NAME].listAlertSystemLoadMore,
    organCode: state[REDUCER_NAME].organCode,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
    firstPage: state[REDUCER_NAME].firstPage,
    page: state[REDUCER_NAME].page,
    alertSystemId: state[REDUCER_NAME].alertSystemId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreAlertSystem: params => dispatch(loadMoreAlertSystem(params)),
    fetchAlertSystem: organCode => dispatch(fetchAlertSystem(organCode)),
  };
};

const enhance = compose(
  withScroll(120, REDUCER_NAME),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(AlertSystemTable);
