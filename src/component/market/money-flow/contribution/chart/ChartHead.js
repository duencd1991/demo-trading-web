import React from 'react';
import { Translate } from 'react-redux-i18n';

export default ChartHead;

function ChartHead(props) {
  const { toggleShowBarChart, isShowBarChart } = props;

  return (
    <div className="row pt-10 w-100">
      <div className="col-10">
        <div className="ml-20 pb-20 fs-12 font-weight-bold fs-15">
          <Translate value="moneyFlowContribution.LABEL_CHART_TOP" />
        </div>
      </div>
      <div className="col-2 float-right">
        <div
          className="btn btn-cus-nomal text-nomal border-radius-30 bg-b-color-3 float-right mr-0"
          onClick={toggleShowBarChart}
        >
          {isShowBarChart ? (
            <Translate value="moneyFlowContribution.BUBBLE_CHART" />
          ) : (
            <Translate value="moneyFlowContribution.BAR_CHART" />
          )}
        </div>
      </div>
    </div>
  );
}
