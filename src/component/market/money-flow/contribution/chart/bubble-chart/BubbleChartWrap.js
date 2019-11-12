import React from 'react';
import BubbleChart from './BubbleChart';
import { connect } from 'react-redux';
import { getUnique } from '../../../../../helpers/Common';
import LabelFooter from './LabelFooter';
import { LabelLeftRight } from '../../../../../common/chart/label';

class BubbleChartWrap extends React.Component {
  state = {
    keyChart: getUnique(),
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.data !== this.props.data) {
      this.setState({ keyChart: getUnique() });
    }
  }

  render() {
    const { data, width, height, ratio, theme } = this.props;

    return (
      <BubbleChart
        key={this.state.keyChart}
        data={data}
        width={width - 30}
        ratio={ratio}
        theme={theme}
        height={height}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(BubbleChartWrap);
