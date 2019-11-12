import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import MiniLineChart from '../miniChart/MiniLineChart';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { REDUCER_NAME, fectchInforCompanyScore } from './reducer';
import Loading from '../../../common/loading/Loading';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import { formatTextFloat, formatPercent } from '../../../helpers/Text';
import './tooltipStyle.scss';
import {
  getColorPrice,
  getIconPriceFollowReferencePrice,
} from '../../../helpers/Color';

const RED = `#eb505a`;
const GREEN = `#00de8b`;
const YELLOW = `#facc5c`;
const _format = require('string-format');
_format.extend(String.prototype, {});

class TooltipContentScore extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fectchInforCompanyScore, organCode, id } = this.props;
    fectchInforCompanyScore(organCode, id);
  }
  getColorOFfSCore = score => {
    switch (score) {
      case 'B':
        return 'scoreValue-span bg-box-b';
      case 'C':
        return 'scoreValue-span bg-box-c';
      case 'D':
        return 'scoreValue-span bg-box-d';
      case 'E':
        return 'scoreValue-span bg-box-e';
      case 'F':
        return 'scoreValue-span bg-box-f';
      default:
        return 'scoreValue-span bg-box-a';
    }
  };
  getRanking(icbRank, icbTotalRanked) {
    let rank = (icbRank / icbTotalRanked) * 100;
    return { width: rank + '%' };
  }
  formatText = text => {
    return text || '--';
  };
  createFakeData() {
    // This function creates data that doesn't look entirely random
    const data = [];
    for (let x = 0; x <= 30; x++) {
      const random = Math.random() * 100;
      data.push(random);
    }
    return data;
  }
  getColor = (value, flag) => {
    if (value > flag) return GREEN;
    if (value < flag) return RED;
    return YELLOW;
  };
  getPercentPriceChange = percentPriceChange => {
    let prefix = '';
    if (percentPriceChange > 0) {
      prefix = `+`;
    }
    return `${prefix}${formatTextFloat(formatPercent(percentPriceChange))}%`;
  };
  renderScoreValue() {
    const { score } = this.props;
    return (
      <div className="tooltip-body-row">
        <>
          {' '}
          {this.renderScoreItem(
            score.value,
            'stRanking.popup.ranking.value',
          )}{' '}
        </>
        <>
          {' '}
          {this.renderScoreItem(
            score.growth,
            'stRanking.popup.ranking.growth',
          )}{' '}
        </>
        <>
          {this.renderScoreItem(
            score.momentum,
            'stRanking.popup.ranking.momentum',
          )}
        </>
        <> {this.renderScoreItem(score.vgm, 'stRanking.popup.ranking.vgm')}</>
      </div>
    );
  }
  renderScoreItem(value, keyI18n) {
    return (
      <div className="scoreValue">
        <span className={this.getColorOFfSCore(value)}>{value}</span>
        <span>{I18n.t(keyI18n)}</span>
      </div>
    );
  }
  renderRankingScore = () => {
    const { score } = this.props;
    return (
      <div className="tooltip-body-row">
        <span className="tooltip-body-label">
          {I18n.t('stRanking.popup.ranking.fiinTradeRank')}
        </span>
        <span className="tooltip-body-value">{`${this.formatText(
          score.icbRank,
        )}/${this.formatText(score.icbTotalRanked)}`}</span>
        <span className="tooltip-body-unit">
          {I18n.t('stRanking.popup.ranking.transportation')}
        </span>
        <span className="tooltip-body-value">{`${this.formatText(
          score.indexRank,
        )}/${this.formatText(score.indexTotalRanked)}`}</span>
        <span className="tooltip-body-unit">{`${this.formatText(
          score.comGroupCode,
        )}`}</span>
      </div>
    );
  };
  renderHeaderTooltip = () => {
    const {
      score,
      colorLeft,
      colorRight,
      arrPrice,
      listSearch,
      ticker,
    } = this.props;
    const inforCompany = listSearch.find(function(element) {
      return score.organCode === element.organCode;
    });
    let latestPrice = _.last(arrPrice) || {};
    let matchPrice = !isNaN(latestPrice.matchPrice / 1000)
      ? (latestPrice.matchPrice / 1000).toFixed(2)
      : '--.--';
    const percentPriceChangeColor = this.getColor(
      latestPrice.percentPriceChange,
      0,
    );

    //   this.getColor(
    //   latestPrice.percentPriceChange,
    //   0,
    // );
    let styleObj = {
      backgroundImage: _format(
        'linear-gradient(93deg, {0}, {1})',
        colorLeft || Const.colorGradient.colorLeft,
        colorRight || Const.colorGradient.colorRight,
      ),
    };

    const propsLineChart = {
      dataChart: arrPrice,
      keyXAccessor: 'tradingDate',
      keyYAccessor: 'matchPrice',
      width: 35,
      height: 13,
    };
    return (
      <div className="tooltip-header" style={styleObj}>
        <div className="tooltip-header-row">
          <span className="tooltip-ticker-name-score">{ticker}</span>
          <MiniLineChart {...propsLineChart} />
          <span className="tooltip-ticker-name-score">{matchPrice}</span>
          <span
            className="tooltip-ticker-change"
            style={{ color: percentPriceChangeColor }}
          >
            {this.getPercentPriceChange(latestPrice.percentPriceChange)}
          </span>
        </div>
        <div className="tooltip-header-row">
          <span className="tooltip-ticker-fullName">
            {inforCompany ? inforCompany.organShortName : '--'}
          </span>
        </div>
      </div>
    );
  };
  render() {
    const { parent, isHovering, parentContent, isLoading } = this.props;
    if (!isHovering) return null;

    return (
      <Tooltip
        parent={parent}
        parentContent={parentContent}
        active={isHovering}
        position={'leftBottom'}
        arrow={null}
        heightTooltip={100}
        widthTooltip={300}
      >
        <div
          className={`tooltip-ticker-hover`}
          style={{ minHeight: '100px' }}
          ref={el => (this.hoverRef = el)}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {this.renderHeaderTooltip()}
              <div className="tooltip-body">
                {this.renderRankingScore()}
                {this.renderScoreValue()}
              </div>
            </>
          )}
        </div>
      </Tooltip>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    score: state[REDUCER_NAME][props.id].score,
    arrPrice: state[REDUCER_NAME][props.id].arrPrice,
    isLoading: state[REDUCER_NAME][props.id].isLoading,
    i18n: state.i18n,
    listSearch: state[COMMON_REDUCER_NAME].listOrganizationSearch,
  };
};
TooltipContentScore.propTypes = {
  fectchInforCompanyScore: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  fectchInforCompanyScore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TooltipContentScore);
