import React from 'react';
import './index.scss';
import { Translate } from 'react-redux-i18n';
import Tooltip from '../../../../common/tooltip/SimpleTooltip';

const RANKING_TOOLTIP = (
  <div className="d-flex flex-column">
    <div>Stock ranking for all stocks in sectors and</div>
    <div>within VN30, VNMidcap, VNSmall groups</div>
  </div>
);

const SCORE_TOOLTIP = (
  <div>
    {RANKING_TOOLTIP}
    <div className="score-box-tooltip-wrapper">
      <div className="score-line">
        <div className="score-dot F-dot" />
        <div className="score-dot E-dot" />
        <div className="score-dot D-dot" />
        <div className="score-dot C-dot" />
        <div className="score-dot B-dot" />
        <div className="score-dot A-dot" />
      </div>
    </div>
    <div className="d-flex justify-content-between">
      <div className="">LOWEST</div>
      <div className="">HIGHEST</div>
    </div>
  </div>
);

class ScoreBox extends React.Component {
  getColorOFfSCore = score => {
    switch (score) {
      case 'B':
        return 'box bg-box-b';
      case 'C':
        return 'box bg-box-c';
      case 'D':
        return 'box bg-box-d';
      case 'E':
        return 'box bg-box-e';
      case 'F':
        return 'box bg-box-f';
      default:
        return 'box bg-box-a';
    }
  };

  formatText = text => {
    return text || '--';
  };

  render() {
    const {
      data: {
        value,
        vgm,
        growth,
        momentum,
        icbRank,
        icbTotalRanked,
        indexRank,
        indexTotalRanked,
        comGroupCode,
      },
    } = this.props;

    return (
      <div className="score-box">
        <div className="score-box__line">
          <div className="d-flex align-items-center mr-3">
            <div className="fs-12 mr-1">
              <Translate value="commonFundamental.scoreBox.fiinTradeRank" />
            </div>
            <Tooltip message={RANKING_TOOLTIP} position={'right'}>
              <i className="icon-info fs-6" />
            </Tooltip>
          </div>

          <div className="d-flex align-items-baseline mr-3">
            <div className="mr-2 fw-bold fs-14">{`${this.formatText(
              icbRank,
            )}/${this.formatText(icbTotalRanked)}`}</div>
            <div className="fs-10">
              <Translate value="commonFundamental.scoreBox.basicMaterials" />
            </div>
          </div>

          <div className="d-flex align-items-baseline">
            <div className="mr-2 fw-bold fs-14">{`${this.formatText(
              indexRank,
            )}/${this.formatText(indexTotalRanked)}`}</div>
            <div className="fs-10">{`${this.formatText(comGroupCode)}`}</div>
          </div>
        </div>

        <div className="score-box__line">
          <div className="d-flex align-items-center mr-3">
            <div className="fs-12 mr-1">
              <Translate value="commonFundamental.scoreBox.score" />
            </div>
            <Tooltip message={SCORE_TOOLTIP} position={'right'}>
              <i className="icon-info fs-6" />
            </Tooltip>
          </div>
          <div className="d-flex mr-10">
            <div className={this.getColorOFfSCore(value)}>{value}</div>
            <div>
              <Translate value="commonFundamental.scoreBox.value" />
            </div>
          </div>
          <div className="d-flex mr-10">
            <div className={this.getColorOFfSCore(growth)}>{growth}</div>
            <div>
              <Translate value="commonFundamental.scoreBox.growth" />
            </div>
          </div>
          <div className="d-flex mr-10">
            <div className={this.getColorOFfSCore(momentum)}>{momentum}</div>
            <div>
              <Translate value="commonFundamental.scoreBox.momentum" />
            </div>
          </div>
          <div className="d-flex">
            <div className={this.getColorOFfSCore(vgm)}>{vgm}</div>
            <div>
              <Translate value="commonFundamental.scoreBox.vgm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ScoreBox.defaultProps = {
  data: {
    value: '',
    vgm: '',
    growth: '',
    momentum: '',
    icbRank: '',
    icbTotalRanked: '',
    indexRank: '',
    indexTotalRanked: '',
    comGroupCode: '',
  },
};

export default ScoreBox;
