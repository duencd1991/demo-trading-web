import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import { REDUCER_NAME, fetchChartImage } from './reducer';
import Const from './Const';
import { I18n } from 'react-redux-i18n';
import './tooltipStyle.scss';
import Loading from '../../../common/loading/Loading';

const _format = require('string-format');
_format.extend(String.prototype, {});

class TooltipAlertSystem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fetchChartImage, organCode, id } = this.props;
    fetchChartImage(organCode, id);
  }
  renderHeaderTooltip = () => {
    const { title } = this.props;
    return (
      <div className="tooltip-header d-flex justify-content-center tooltip-header-alert">
        <span className="tooltip-header-alert-title text-uppercase">
          {title}
        </span>
      </div>
    );
  };
  render() {
    const { parent, isHovering, parentContent, images, isLoading } = this.props;
    if (!isHovering) return null;

    return (
      <Tooltip
        parent={parent}
        parentContent={parentContent}
        active={isHovering}
        position={'leftBottom'}
        arrow={null}
        heightTooltip={239}
        widthTooltip={370}
      >
        <div
          className={`tooltip-ticker-hover tooltip-alert-system-hover`}
          ref={el => (this.hoverRef = el)}
        >
          <>{this.renderHeaderTooltip()}</>
          <div className="tooltip-body">
            {isLoading ? (
              <Loading />
            ) : (
              <img className="alert-chart-image" alt="" src={images} />
            )}
          </div>
        </div>
      </Tooltip>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    images: state[REDUCER_NAME][props.id].images,
    isLoading: state[REDUCER_NAME][props.id].isLoading,
    i18n: state.i18n,
  };
};
TooltipAlertSystem.propTypes = {
  fetchChartImage: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  fetchChartImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TooltipAlertSystem);
