import React from 'react';
import Chart from './Chart';
import './index.scss';
import DropDownCode from './DropDownCode';
import DropDownRate from './DropDownRate';
import TimeRange from './TimeRange';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Export } from './../../../common/export';

class Valuation extends React.Component {
  render() {
    return (
      <div className="index-valuation-wrapper">
        <div className="valuation-filter">
          <div className="list-filter float-left">
            <div className="line-drop mr-10">
              <DropDownCode />
            </div>
            <div className="line-drop">
              <DropDownRate />
            </div>
          </div>
          <div className="tabs-right-top float-right">
            <TimeRange />
          </div>
        </div>

        <div className="clearfix" />
        <div className="valuation-filter mt-10">
          <div className="tabs-right-top float-right">
            <Export
              exportId="valuation-chart"
              exportName="valuation.png"
              title={I18n.t('marketInDepthValuation.export_')}
            />
          </div>
        </div>
        <div className="clearfix" />
        <div className="mt-10">
          <Chart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(Valuation);
