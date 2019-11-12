import React from 'react';
import { Chart } from 'react-stockcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Label } from 'react-stockcharts/lib/annotation';
import { YAxis } from 'react-stockcharts/lib/axes';
import { compose } from 'redux';
import { THEMES } from '../../../../configs/LayoutConfig';
import {
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  LineSeries,
  MouseCoordinateX,
} from '../../../common/chart';
import { formatPrice } from '../../../helpers/Text';
import { withComponentId } from '../../../common/ComponentIdContext';
import { REDUCER_NAME } from '../reducer';
import { formatTextFloat } from './../../../helpers/Text';
import { connect } from 'react-redux';
import memoize from 'fast-memoize';
import { I18n } from 'react-redux-i18n';
import HoverTooltip from '../../../common/chart/lib/tooltip/HoverTooltip';
const clock = require('../../../../assets/images/svg/clock.svg');

const clockImage = new Image();
clockImage.src = clock;

const COMMON_SETTINGS = {
  MARGIN: { left: 40, right: 50, top: 0, bottom: 30 },
  TEXT_SM_SIZE: 10,
  TEXT_MD_SIZE: 12,
  TEXT_LG_SIZE: 14,
};

const SETTINGS_DARK = {
  TEXT_COLOR: '#ffffff',
  TITLE_COLOR: '#ffffff',
  Y_AXIS_TEXT_COLOR: '#ffffff',
  CHART_ACTUAL_PRICE: {
    COLOR: '#47c3ff',
  },
  CHART_TARGET_PRICE: {
    COLOR: '#facc5c',
  },
  ...COMMON_SETTINGS,
};

const SETTINGS_LIGHT = {
  TITLE_COLOR: '#1f2023',
  Y_AXIS_TEXT_COLOR: '#1f2023',
  CHART_ACTUAL_PRICE: {
    COLOR: '#2c73e8',
  },
  CHART_TARGET_PRICE: {
    COLOR: '#f8bc06',
  },
  ...COMMON_SETTINGS,
};

class TargetPriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.memoizedGetData = memoize(this.getData);
  }

  getData = targetPriceHistories => {
    return targetPriceHistories.map(price => ({
      ...price,
      targetPrice: formatPrice(price.targetPrice),
      actualPrice: formatPrice(price.actualPrice),
      tradingDate: price.reportDate,
    }));
  };

  tooltipContent = () => ({ currentItem }) => ({
    y: [
      {
        label: `${I18n.t('consensusAnalysis.actualPrice')}: `,
        value: formatTextFloat(currentItem.actualPrice),
      },
      {
        label: `${I18n.t('consensusAnalysis.targetPrice')}: `,
        value: formatTextFloat(currentItem.targetPrice),
      },
      {
        label: `${I18n.t('consensusAnalysis.numOfRating')}: `,
        value: currentItem.numOfRating,
      },
      {
        label: '',
        value: moment(currentItem.tradingDate).format('l'),
      },
    ],
  });

  render() {
    const { width, theme, targetPriceHistories, height } = this.props;
    const SETTINGS = theme === THEMES.DARK ? SETTINGS_DARK : SETTINGS_LIGHT;
    const gridWidth = width - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right;
    const data = this.memoizedGetData(targetPriceHistories);
    if (targetPriceHistories.length < 2) {
      return null;
    }

    const targetPriceCoordinateColor =
      theme === THEMES.DARK
        ? 'rgba(251, 217, 222, 0.15)'
        : 'rgba(250, 204, 92, 0.15)';

    return (
      <ChartCanvas
        width={width}
        height={height}
        data={data}
        ratio={window.devicePixelRatio}
        margin={SETTINGS.MARGIN}
        clip={false}
        padding={20}
      >
        <Chart
          id={1}
          yExtents={d => [
            Math.min(d.targetPrice, d.actualPrice) * 0.8,
            Math.max(d.targetPrice, d.actualPrice) * 1.2,
          ]}
          height={height}
          origin={(w, h) => [0, h - height]}
        >
          <YAxis
            axisAt="right"
            orient="right"
            tickInterval={5}
            tickStroke={SETTINGS.Y_AXIS_TEXT_COLOR}
            tickStrokeOpacity={0.5}
            showDomain={false}
            zoomEnabled={false}
            outerTickSize={0}
            edgeClip={true}
            showTicks={true}
            innerTickSize={gridWidth * -1}
          />

          <LineSeries
            yAccessor={d => d.targetPrice}
            stroke={SETTINGS.CHART_TARGET_PRICE.COLOR}
          />

          <LineSeries
            yAccessor={d => d.actualPrice}
            stroke={SETTINGS.CHART_ACTUAL_PRICE.COLOR}
          />

          <CurrentCoordinate
            color={targetPriceCoordinateColor}
            yAccessor={d => d.targetPrice}
          />
          <CurrentCoordinate yAccessor={d => d.actualPrice} />

          <HoverTooltip
            bgOpacity={0.1}
            fill={'#ffffff'}
            stroke={'#555555'}
            opacity={1}
            yAccessor={d => d.value}
            fontSize={11}
            tooltipContent={this.tooltipContent()}
            tooltipCanvas={(_ref5, content, ctx) => {
              const X = 10;
              const Y = 7;
              const LINE_SPACE = 3;
              const LABEL_MARGIN = 3;

              const fontFamily = _ref5.fontFamily,
                fontSize = _ref5.fontSize;
              let startY = Y;

              for (let i = 0; i < content.y.length; i++) {
                if (i > 0) {
                  startY += LINE_SPACE;
                }
                if (i === 3) {
                  const textY = startY + fontSize * (i + 1);
                  const y = content.y[i];

                  ctx.drawImage(
                    clockImage,
                    X,
                    textY - fontSize + 1,
                    fontSize,
                    fontSize,
                  );

                  ctx.font = fontSize + 'px ' + fontFamily;
                  ctx.fillStyle = '#2d2d2d';
                  ctx.fillText(y.value, X + fontSize + LABEL_MARGIN, textY);
                  continue;
                }
                const y = content.y[i];
                ctx.font = fontSize + 'px ' + fontFamily;
                const textY = startY + fontSize * (i + 1);
                ctx.fillStyle = '#2d2d2d';
                ctx.fillText(y.label, X, textY);

                ctx.font = 'bold ' + fontSize + 'px ' + fontFamily;
                let startXText = LABEL_MARGIN + ctx.measureText(y.label).width;
                ctx.fillStyle = '#2d2d2d';
                ctx.fillText(y.value, startXText, textY);
              }
            }}
          />

          <Label
            x={width - SETTINGS.MARGIN.left - SETTINGS.MARGIN.right / 2 + 5}
            y={(height - SETTINGS.MARGIN.top - SETTINGS.MARGIN.bottom) / 2}
            rotate={90}
            fill={SETTINGS.TITLE_COLOR}
            fontSize={SETTINGS.TEXT_LG_SIZE}
            opacity={0.6}
            text={I18n.t('consensusAnalysis.price')}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

TargetPriceChart.propTypes = {
  targetPriceHistories: PropTypes.array,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

TargetPriceChart.defaultProps = {
  targetPriceHistories: [],
};

const mapStateToProps = (state, { componentId }) => ({
  i18n: state.i18n,
  theme: state.theme,
  targetPriceHistories: state[REDUCER_NAME][componentId].targetPriceHistories,
});

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(TargetPriceChart);
