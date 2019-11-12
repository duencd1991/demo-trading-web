import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import './tooltipStyle.scss';
import { connect } from 'react-redux';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../../app/commonReducer';
import { REDUCER_NAME, fectchInforCompanyScore } from './reducer';
import Loading from '../../../common/loading/Loading';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
const _format = require('string-format');
_format.extend(String.prototype, {});

class TooltipScoreValue extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fectchInforCompanyScore, organCode, id } = this.props;
    fectchInforCompanyScore(organCode, id);
  }
  renderCheckedValue = (isCheck, keyI18n) => {
    const className = isCheck ? 'tooltip-body-checked' : 'tooltip-body-remove';
    return (
      <span className={className}>
        <span>{I18n.t(keyI18n)}</span>
      </span>
    );
  };
  renderTooltipHeader = () => {
    const {
      score,
      colorLeft,
      colorRight,
      organCode,
      listSearch,
      ticker,
    } = this.props;
    const inforCompany = listSearch.find(function(element) {
      return score.organCode === element.organCode;
    });
    let styleObj = {
      backgroundImage: _format(
        'linear-gradient(93deg, {0}, {1})',
        colorLeft || Const.colorGradient.colorLeft,
        colorRight || Const.colorGradient.colorRight,
      ),
    };
    return (
      <div className="tooltip-header" style={styleObj}>
        <div className="tooltip-header-row">
          <span className="tooltip-ticker-name-score">{ticker}</span>
          <span className="tooltip-header-score"> A</span>
          <span className="tooltip-ticker-name-score">Value Score (8/10)</span>
        </div>
        <div className="tooltip-header-row">
          <span className="tooltip-ticker-fullName">
            {inforCompany ? inforCompany.organName : '--'}
          </span>
        </div>
      </div>
    );
  };
  renderContentTooltip = () => {
    return (
      <div className="tooltip-body">
        <div className="tooltip-body-row">
          <div className="tooltip-body-row-col w-50">
            {this.renderCheckedValue(true, 'Earning Yield')}
            {this.renderCheckedValue(true, 'Market Value')}
            {this.renderCheckedValue(true, 'Div. Yield')}
            {this.renderCheckedValue(true, 'Price per Share')}
            {this.renderCheckedValue(false, 'Cash & Investment / Price')}
          </div>
          <div className="tooltip-body-row-col w-50">
            {this.renderCheckedValue(true, 'EV/ EBITDA')}
            {this.renderCheckedValue(true, 'Gross Profit Margin')}
            {this.renderCheckedValue(true, 'Cashflow')}
            {this.renderCheckedValue(true, 'Debt Pressure')}
            {this.renderCheckedValue(true, 'Current Ratio')}
          </div>
        </div>
      </div>
    );
  };
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
        heightTooltip={152}
        widthTooltip={300}
      >
        <div
          className={`tooltip-ticker-hover`}
          style={{ minHeight: '152px' }}
          ref={el => (this.hoverRef = el)}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {this.renderTooltipHeader()}
              {this.renderContentTooltip()}
            </>
          )}
        </div>
      </Tooltip>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    listSearch: state[COMMON_REDUCER_NAME].listOrganizationSearch,
    score: state[REDUCER_NAME][props.id].score,
    isLoading: state[REDUCER_NAME][props.id].isLoading,
    i18n: state.i18n,
  };
};
TooltipScoreValue.propTypes = {
  fectchInforCompanyScore: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  fectchInforCompanyScore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TooltipScoreValue);
