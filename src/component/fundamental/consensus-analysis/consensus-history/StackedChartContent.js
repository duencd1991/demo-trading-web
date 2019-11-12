import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SizeTracker from '../../../common/size-tracker/SizeTracker';
import { withComponentId } from '../../../common/ComponentIdContext';
import { computedRecommendation } from '../helpers';
import { REDUCER_NAME } from '../reducer';
import Bar from './Bar';

class StackedChartContent extends PureComponent {
  getBarWidth = width => {
    const { recommendationHistories } = this.props;

    return width / recommendationHistories.length;
  };

  render() {
    const { recommendationHistories, locale } = this.props;
    const data = computedRecommendation(recommendationHistories, locale);

    return (
      <div className="bars-wrapper d-flex flex-fill">
        <SizeTracker className="flex-fill chart-content bars">
          {(width, height) =>
            data.map((item, index) => (
              <Bar
                width={this.getBarWidth(width)}
                height={height}
                data={item}
                index={index}
                key={index}
              />
            ))
          }
        </SizeTracker>
      </div>
    );
  }
}

StackedChartContent.propTypes = {
  locale: PropTypes.string.isRequired,
  recommendationHistories: PropTypes.array,
};

StackedChartContent.defaultProps = {
  recommendationHistories: [],
};

const mapStateToProps = (state, { componentId }) => ({
  recommendationHistories:
    state[REDUCER_NAME][componentId].recommendationHistories,
  locale: state.i18n.locale,
});

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(StackedChartContent);
