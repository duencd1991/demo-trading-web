import React, { PureComponent } from 'react';
import { Translate } from 'react-redux-i18n';

const items = [
  {
    type: 'circle',
    color: '#ea2e48',
    i18nKey: 'sell',
  },
  {
    type: 'circle',
    color: '#f57404',
    i18nKey: 'noRecommendation',
  },
  {
    type: 'circle',
    color: '#fdf0a5',
    i18nKey: 'neutral',
  },
  {
    type: 'circle',
    color: '#00de8b',
    i18nKey: 'hold',
  },
  {
    type: 'circle',
    color: '#009d5b',
    i18nKey: 'buy',
  },
  {
    type: 'line',
    color: '#47c3ff',
    i18nKey: 'actualPrice',
  },
  {
    type: 'line',
    color: '#facc5c',
    i18nKey: 'targetPrice',
  },
];

class Legend extends PureComponent {
  render() {
    return (
      <div className="stacked-chart-legends">
        {items.map((item, index) => (
          <div key={index} className="legend-item">
            <div
              className={item.type}
              style={{ backgroundColor: item.color }}
            />
            <div>
              <Translate value={`consensusAnalysis.${item.i18nKey}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Legend.propTypes = {};

export default Legend;
