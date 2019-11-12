import React from 'react';
import ChartContent from './ChartContent';
import { fetchListChart, REDUCER_NAME } from './reducer';
import { connect } from 'react-redux';
import Const from './Const';
import Loading from './../../../common/loading/Loading';
import { getUnique } from './../../../helpers/Common';
import { ChartFooter } from './../../../common/chart/footer';
import { LabelLeftRight } from '../../../common/chart/label';
import { Translate } from 'react-redux-i18n';

const MIN_WIDTH = 500;
const HEIGHT = 350;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyChart: getUnique(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchListChart());
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      this.props.component !== nextProps.component ||
      this.props.data !== nextProps.data
    ) {
      this.setState({ keyChart: getUnique() });
    }
  }

  renderWithNoData = height => {
    return (
      <div
        className="valuation-chart stock-chart position-relative"
        style={{ height }}
      >
        <Loading />
      </div>
    );
  };

  renderWithData = height => {
    const {
      data,
      rate,
      comGroupCode,
      listIndustryByKey,
      component,
    } = this.props;

    const codeName = { ...listIndustryByKey, ...Const.listComGroupCodeByKey }[
      comGroupCode
    ].icbName;

    const width = Math.max(component.width - 40, MIN_WIDTH);
    const heightFooter = 40;
    const heightHeader = 20;

    return (
      <div
        id="valuation-chart"
        className="valuation-chart stock-chart"
        style={{ width, height }}
      >
        <div className="position-relative">
          <LabelLeftRight text={codeName + ' - Points'} />
          <LabelLeftRight
            text={Const.listRateByKey[rate].name}
            position={'right'}
          />
          <div style={{ height: heightHeader }}>
            <Translate value={'marketInDepthValuation.chartTitle'} />
          </div>
          <div className="ml-20 mr-20">
            <ChartContent
              key={this.state.keyChart}
              data={data}
              rate={rate}
              codeName={codeName}
              width={width - 60}
              height={height - heightFooter - heightHeader}
              ratio={window.devicePixelRatio}
            />
          </div>
        </div>

        <ChartFooter
          list={[
            { text: codeName, color: '#42b6f6', type: 'line' },
            {
              text: Const.listRateByKey[rate].name,
              color: '#facc5c',
              type: 'line',
            },
          ]}
        />
      </div>
    );
  };

  render() {
    const { data, isFetching } = this.props;

    if (!data || data.length < 2 || isFetching) {
      return this.renderWithNoData(HEIGHT);
    }
    return this.renderWithData(HEIGHT);
  }
}

const mapStateToProps = state => {
  return {
    data: state[REDUCER_NAME].listDataChart,
    rate: state[REDUCER_NAME].rate,
    comGroupCode: state[REDUCER_NAME].comGroupCode,
    listIndustryByKey: state[REDUCER_NAME].listIndustryByKey,
    component: state[REDUCER_NAME].component,
    isFetching: state[REDUCER_NAME].isFetching,
  };
};

export default connect(mapStateToProps)(Chart);
