import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { compose } from 'redux';
import Doughnut from '../../../common/donut-chart/Doughnut';
import { withComponentId } from '../../../common/ComponentIdContext';
import { formatPercent, formatTextFloat } from '../../../helpers/Text';
import { REDUCER_NAME } from '../reducer';

const mapColor = {
  BUY: '#009d5b',
  SELL: '#ea2e48',
  NOCMT: '#f57404',
  NEU: '#fdf0a5',
  HOLD: '#00de8b',
};

class Recommendation extends PureComponent {
  getI18nKey = () => 'localRecommendationTypeName';

  getData = () => {
    const { recommendations } = this.props;
    const item1Key = this.getI18nKey();
    const total = recommendations.reduce((t, item) => t + item.numOfReport, 0);
    return recommendations.map(item => ({
      item1: item[item1Key],
      item2: item.numOfReport / total,
    }));
  };

  getColors = () => {
    const { recommendations } = this.props;

    return recommendations.map(item => mapColor[item.recommendationTypeCode]);
  };

  getLatestRecommendation = () => {
    const { recommendations } = this.props;
    const sorted = recommendations.concat().sort((a, b) => {
      if (b.reportDate > a.reportDate) {
        return 1;
      }

      if (b.reportDate < a.reportDate) {
        return -1;
      }

      if (b.publicDate > a.publicDate) {
        return 1;
      }

      if (b.publicDate < a.publicDate) {
        return -1;
      }

      if (b.numOfReport > a.numOfReport) {
        return 1;
      }

      if (b.numOfReport < a.numOfReport) {
        return -1;
      }

      return 0;
    });
    const [recommend] = sorted;

    return recommend;
  };

  renderChartTooltip = value => {
    return formatTextFloat(formatPercent(value));
  };

  getRecommendationColor = recommendation => ({
    color: mapColor[recommendation.recommendationTypeCode],
  });

  render() {
    const { recommendations } = this.props;
    if (!recommendations.length) {
      return <div className="recommendation" />;
    }
    const data = this.getData();
    const recommendation = this.getLatestRecommendation();

    return (
      <div className="recommendation">
        <Doughnut
          title={<Translate value="consensusAnalysis.recommendationTitle" />}
          listData={data}
          colors={this.getColors()}
          renderTooltip={this.renderChartTooltip}
          tooltipPaddingX={70}
          tooltipPaddingY={145}
        />

        <div className="lastest-recommendation">
          <Translate value="consensusAnalysis.lastestRecommendation" />
          <span style={this.getRecommendationColor(recommendation)}>
            {recommendation[this.getI18nKey()]}*
          </span>
        </div>

        <div className="notice">
          <Translate value="consensusAnalysis.notice" />
        </div>
      </div>
    );
  }
}

Recommendation.propTypes = {
  recommendations: PropTypes.array,
  componentId: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
};

Recommendation.defaultProps = {
  recommendations: [],
};

const mapStateToProps = (state, { componentId }) => ({
  recommendations: state[REDUCER_NAME][componentId].recommendations,
  locale: state.i18n.locale,
});

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(Recommendation);
