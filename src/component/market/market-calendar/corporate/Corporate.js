import React from 'react';
import Table from './Table';
import Search from './Search';
import FilterTypeEvent from './FilterTypeEvent';
import FilterTime from './FilterTime';
import { connect } from 'react-redux';
import {
  REDUCER_NAME,
  fetchListDataTable,
  fetchListOrganization,
} from './../reducer';
import Const from './Const';
import './CorporateStyle.scss';

class Corporate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(fetchListDataTable());
    this.props.dispatch(fetchListOrganization());
  }

  styleTable(type) {
    const { listCashDividend, listStockDividend } = this.props;
    let height = 60;
    if (type === Const.listTypeDivEventByKey.cash.key) {
      if (listCashDividend.length > 0) height = 200;
    } else {
      if (listStockDividend.length > 0) height = 200;
    }

    return height;
  }

  render() {
    const { currentFilterEvents } = this.props;
    let eventDiv = '';

    const titleTable = type => {
      let title = '';
      if (type === Const.listTypeDivEventByKey.cash.key) {
        title = Const.listTitleTableDiv.cash;
      } else {
        title = Const.listTitleTableDiv.stock;
      }
      return title;
    };

    if (currentFilterEvents === Const.listFilterEventByKey.div.key) {
      eventDiv = (
        <div className="table-corporate">
          {Const.listTypeDivEvent.map(type => (
            <div key={type}>
              <div className="text-div">
                <a>{titleTable(type)}</a>
              </div>
              <div>
                <Table typeDiv={type} countTable={2} offsetTable={35} />
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      eventDiv = (
        <div className="table-corporate">
          <Table />
        </div>
      );
    }

    return (
      <div className="corporate h-100">
        <div>
          <div className="row w-100">
            <div className="col-8 list-filter">
              <Search
                disabled={false}
                typeSearch={'Search'}
                dateRangeOption={null}
              />
              <FilterTypeEvent />
            </div>
          </div>

          <div>
            <FilterTime />
          </div>

          <div className="mt-10">{eventDiv}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentFilterEvents: state[REDUCER_NAME].currentFilterEvents,
    listCashDividend: state[REDUCER_NAME].listCashDividend,
    listStockDividend: state[REDUCER_NAME].listStockDividend,
  };
};

export default connect(mapStateToProps)(Corporate);
//export default Corporate
