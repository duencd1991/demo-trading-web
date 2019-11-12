import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Const from './Const';
import {
  REDUCER_NAME,
  fetchAlertSystem,
  loadMoreAlertSystem,
} from '../reducer';
import { compose } from 'redux';
import STTable from './../../../common/mixTable/STTable';
import withScroll from './../../../common/withScroll';
import i18n from '../../../lang/i18n';

class AlertSystemTable extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: Const.maxRowData,
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

  getDataFromRedux = state => state[REDUCER_NAME].listAlertSystemByTicker;

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
    const { page } = this.state;
    const {
      loadMoreAlertSystem,
      totalPage,
      featureType,
      isLoading,
      alertSystemId,
    } = this.props;
    if (page === totalPage || isLoading) return;
    this.setState(
      prevState => {
        return {
          page:
            prevState.page === totalPage ? prevState.page : prevState.page + 1,
        };
      },
      () => {
        const { page, pageSize } = this.state;
        loadMoreAlertSystem({
          Page: page,
          PageSize: pageSize,
          featureType,
          alertSystemId,
        });
      },
    );
  };

  render() {
    const { isLoading, ids, table, handleModify, parentRef } = this.props;
    const objectConfirmDel = {
      title: 'alertPersonal.confirmDel.title',
      textContent: 'alertPersonal.confirmDel.content',
      parentRef: parentRef ? parentRef.current : null,
      onOverlayClicked: true,
    };
    return (
      <STTable
        ids={ids}
        table={table}
        isLoading={isLoading}
        getDataFromRedux={this.getDataFromRedux}
        handleModify={handleModify}
        schemaKey={'alertSystem.alertSystemHeader'}
        listColumn={Const.listColumn}
        objectConfirmDel={objectConfirmDel}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerAlertSystem,
    listAlertSystemByTicker: state[REDUCER_NAME].listAlertSystemByTicker,
    isShowPopupSetting: state[REDUCER_NAME].isShowPopupSetting,
    featureType: state[REDUCER_NAME].featureType,
    isLoading: state[REDUCER_NAME].isLoading,
    totalPage: state[REDUCER_NAME].totalPage,
    firstPage: state[REDUCER_NAME].firstPage,
    alertSystemId: state[REDUCER_NAME].alertSystemId,
    i18n: state.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMoreAlertSystem: params => dispatch(loadMoreAlertSystem(params)),
    fetchAlertSystem: featureType => dispatch(fetchAlertSystem(featureType)),
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
