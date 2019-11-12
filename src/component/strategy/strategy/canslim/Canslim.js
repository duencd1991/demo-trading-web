import React from 'react';
import Tab from '../../../common/tab-timer';
import Header from '../common/Header';
import Search from './Search';
import Const from './Const';
import TableCanslim from './Table';
import './index.scss';

const colowHeaderCanslim = '#09a07e';
const text = `*Calculated by average return of all recommended stocks (cumulative over the past 10 years)`;

class Canslim extends React.Component {
  render() {
    return (
      <div className="strategy-canslim">
        <Header
          firstStrName={`CANSLIM Strategy by William O'Neil`}
          secondStrName={`COMMON-USED GROWTH STOCK INVESTING STRATEGY`}
          title={`CANSLIM`}
          isShowCheckbox={false}
          color={colowHeaderCanslim}
        />
        <div className="body-canslim-strategy">
          <div className="search-canslim">
            <Search
              disabled={false}
              typeSearch={'Search'}
              dateRangeOption={null}
            />
          </div>
          <div className="table-canslim">
            <TableCanslim
              title={'canslim.tableCanslim'}
              schemaKey={Const.tableCanslim}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Canslim;
