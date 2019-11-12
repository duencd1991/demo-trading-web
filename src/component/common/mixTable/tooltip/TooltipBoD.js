import React, { Component } from 'react';
import './tooltipStyle.scss';
import TooltipContentScore from './TooltipContentScore';
import TooltipScoreValue from './TooltipScoreValue';
import TooltipAlertSystem from './TooltipAlertSystem';
import { REDUCER_NAME, setUpData } from './reducer';
import { connect } from 'react-redux';
import Const from './Const';
const _format = require('string-format');
_format.extend(String.prototype, {});

class TooltipBoD extends Component {
  constructor(props) {
    super(props);
    this.hoverRef = null;
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      isHovering: false,
      x: 0,
      y: 0,
      isCallApi: true,
    };
  }
  componentDidMount() {
    const { setUpData, code } = this.props;
    setUpData(code);
  }
  handleMouseHover(e) {
    const { isHovering } = this.state;
    let x = e.clientX;
    let y = e.clientY;
    if (!isHovering) {
      this.setState({
        isHovering: true,
        x: x,
        y: y,
        isCallApi: false,
      });
    }
  }

  handleMouseOut(e) {
    this.setState({ isHovering: false, isCallApi: true });
  }

  render() {
    const {
      colorLeft,
      colorRight,
      code,
      parentRef,
      typeTooltip,
      title,
      ticker,
    } = this.props;
    return (
      <div
        className="tooltip-strategy"
        onMouseLeave={e => this.handleMouseOut(e)}
        onMouseMove={e => this.handleMouseHover(e)}
        ref={c => (this.tipRef = c)}
      >
        {' '}
        {typeTooltip === Const.typeHover.hoverScore &&
          this.state.isHovering && (
            <TooltipContentScore
              parent={this.tipRef ? this.tipRef.closest('td') : this.tipRef}
              parentContent={parentRef}
              ticker={ticker}
              isHovering={this.state.isHovering}
              organCode={code}
              colorLeft={colorLeft}
              colorRight={colorRight}
              x={this.state.x}
              y={this.state.y}
              id={code}
              isCallApi={true}
            />
          )}
        {typeTooltip === Const.typeHover.hoverValueScore &&
          this.state.isHovering && (
            <TooltipScoreValue
              parent={this.tipRef}
              parentContent={parentRef}
              ticker={ticker}
              isHovering={this.state.isHovering}
              organCode={code}
              colorLeft={colorLeft}
              colorRight={colorRight}
              x={this.state.x}
              y={this.state.y}
              id={code}
              isCallApi={true}
            />
          )}
        {typeTooltip === Const.typeHover.hoverAlertSystem &&
          this.state.isHovering && (
            <TooltipAlertSystem
              parent={this.tipRef}
              parentContent={parentRef}
              isHovering={this.state.isHovering}
              organCode={code}
              title={title}
              colorLeft={colorLeft}
              colorRight={colorRight}
              x={this.state.x}
              y={this.state.y}
              id={code}
              isCallApi={true}
            />
          )}
        <div className="tooltip_content">{this.props.children}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  setUpData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TooltipBoD);
