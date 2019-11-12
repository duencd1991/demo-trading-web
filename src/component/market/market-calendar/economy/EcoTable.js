import React from 'react';
import { REDUCER_NAME, intercalFetchEconomy } from '../reducer';
import { connect } from 'react-redux';
import Const from './Const';
import Table from '../../../common/table/Table';
import moment from 'moment';
import './EconomyStyle.scss';
import Tooltip from './Tooltip';
import withScroll from './../../../common/withScroll';
import { compose } from 'redux';
import { I18n } from 'react-redux-i18n';

class Economy extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 1,
      pageSize: 50,
    };
    this.state = this.initialState;
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    const item = {
      page: this.state.page,
      pageSize: this.state.pageSize,
    };

    this.props.intercalFetchEconomy(item);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      const item = {
        page: this.state.page,
        pageSize: this.state.pageSize,
      };

      this.props.intercalFetchEconomy(item);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.firstPage !== 0 &&
      nextProps.firstPage !== this.props.firstPage
    ) {
      this.resetScroll();
      this.setState({ ...this.initialState });
      // check filter have value then user remove then reset state
    }
  }

  resetScroll = () => {
    this.tableRef.current.scrollTop = 0;
  };

  getDataFromRedux = state => state[REDUCER_NAME].listTickerEconomyByTicker;

  FormatVN = str => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  };

  getSchema = () => {
    // check color of item importance
    const getClassName = item => {
      const type = 'pt-1 badge bg';
      if (item.toUpperCase() === Const.importance.low) {
        return `${type}-l-color-3`;
      }
      if (item.toUpperCase() === Const.importance.high) {
        return `${type}-s-color-3`;
      }
      if (item.toUpperCase() === Const.importance.med) {
        return `${type}-s-color-4`;
      }
      return `${type}-t-color-1`;
    };

    const getLevelName = item => {
      if (this.FormatVN(item) === Const.importanceNew.low) {
        return I18n.t('economy.importance.LOW');
      }
      if (this.FormatVN(item) === Const.importanceNew.med) {
        return I18n.t('economy.importance.MED');
      }
      if (this.FormatVN(item) === Const.importanceNew.high) {
        return I18n.t('economy.importance.HIGH');
      }
      return '';
    };
    return Object.keys(Const.listColumn).map(item => {
      const key = Const.listColumn[item];
      const title = `economy.economyTable.${item}`;
      const result = {
        key,
        title,
        disableSort: true,
      };

      if (key === Const.listColumn.event) {
        const styleLable = {
          fontWeight: 'normal',
        };
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => (
            <div className="text-left" style={styleLable}>
              <Tooltip
                message={item.sourceURL}
                messageFiin={'https://www.google.com.vn/'}
                position={'right'}
              >
                {item.eventTitle}
              </Tooltip>
            </div>
          ),
        };
      }
      if (key === Const.listColumn.importance) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'center', width: '100px' },
          tdClassName: 'w-100px',
          render: (text, item) => {
            let classColor = getClassName(item.levelName);
            let styleDis = { display: 'block' };
            return (
              <div>
                <span className={`${classColor} text-center`} style={styleDis}>
                  {/* {text.toUpperCase()} */}
                  {getLevelName(item.levelName)}
                </span>
              </div>
            );
          },
        };
      }
      if (key === Const.listColumn.actual) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => (
            <div className="text-right">
              {item.recentValue === 0 ? '' : item.recentValue + '%'}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.forecast) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => (
            <div className="text-right">
              {item.forecastValue === 0 ? '' : item.forecastValue + '%'}
            </div>
          ),
        };
      }
      if (key === Const.listColumn.previous) {
        return {
          disableSort: true,
          ...result,
          thStyle: { textAlign: 'right' },
          render: (text, item) => (
            <div className="text-right">
              {item.previousValue === 0 ? '' : item.previousValue + '%'}
            </div>
          ),
        };
      }

      return result;
    });
  };

  getIds = () => {
    const { listEco, ids, listCheckBox, filterDate, activeStatus } = this.props;
    const convertFilterDate =
      this.props.i18n.locale === 'en'
        ? moment(filterDate).format('dddd, MMMM DD, YYYY', 'en')
        : moment(filterDate).format('dddd, MMMM DD, YYYY', 'vi-VN');
    if (activeStatus) {
      const newIds = ids.filter(id => {
        return listCheckBox.some(
          checkbox => checkbox.value && checkbox.key === listEco[id].levelName,
        );
      });
      return this.tranformData(newIds);
    }

    if (!activeStatus) {
      const newIds = ids.filter(id => {
        return listCheckBox.some(
          checkbox =>
            checkbox.value &&
            checkbox.key === listEco[id].levelName &&
            moment(listEco[id].issueDateFrom).format('dddd, MMMM DD, YYYY') ===
              convertFilterDate,
        );
      });
      return this.tranformData(newIds);
    }
  };

  tranformData = filteredIds => {
    const { listEco } = this.props;

    const listStartFormat = filteredIds.map(id => {
      return {
        id,
        date: moment(listEco[id].issueDateFrom).format('dddd, MMMM DD, YYYY'),
      };
    });

    const groups = listStartFormat.reduce((groups, item) => {
      const date = item.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item.id);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map(date => {
      return {
        renderTitle: () => date,
        ids: groups[date],
        canToggle: true,
        rowStyle: {
          cursor: 'pointer',
        },
      };
    });
    return groupArrays;
  };

  handleScroll = e => {
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (this.props.ids.length < 20) return;
    // if list item less than 20 disable load more
    if (bottom) {
      this.loadMore();
    }
  };

  loadMore = () => {
    const { page } = this.state;
    const { totalPageEco, isFetchingEco } = this.props;
    if (page === totalPageEco || isFetchingEco) return;
    this.setState(
      prevState => {
        return {
          page:
            prevState.page === totalPageEco
              ? prevState.page
              : (prevState.page += 1),
        };
      },
      () => {
        const { page, pageSize } = this.state;
        const params = {
          weekOfYear: this.props.weekOfYear,
          year: this.props.year,
          keyWord: this.props.keyWord,
          page,
          pageSize,
        };
        this.props.intercalFetchEconomy(params);
      },
    );
  };

  render() {
    return (
      <div className="tab-content h-100">
        <div className="tab-pane active h-100" role="tabpanel">
          <Table
            table={this.props.table}
            stickyFirstColumn={false}
            hideColumns={[
              Const.listColumn.publicDate,
              Const.listColumn.sourceURL,
              Const.listColumn.sourceURLFiin,
            ]}
            resizable={true}
            columnDraggable={false}
            rowDraggable={false}
            getDataFromRedux={this.getDataFromRedux}
            groups={this.getIds()}
            schema={this.getSchema()}
            onScrollFunction={this.handleScroll}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    ids: state[REDUCER_NAME].listTickerEconomy,
    listEco: state[REDUCER_NAME].listTickerEconomyByTicker,
    filterOption: state[REDUCER_NAME].filterOption,
    filterDate: state[REDUCER_NAME].filterDate,
    activeStatus: state[REDUCER_NAME].activeStatus,
    weekOfYear: state[REDUCER_NAME].weekOfYear,
    year: state[REDUCER_NAME].year,
    keyWord: state[REDUCER_NAME].keyWord,
    totalPageEco: state[REDUCER_NAME].totalPageEco,
    isFetchingEco: state[REDUCER_NAME].isFetchingEco,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    intercalFetchEconomy: params => dispatch(intercalFetchEconomy(params)),
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withScroll(165, REDUCER_NAME),
);
export default enhance(Economy);
