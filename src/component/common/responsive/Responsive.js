import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Responsive extends React.Component {
  getNumColumn = numColumn => {
    const length = this.props.children.length;

    return Math.min(length, numColumn);
  };

  calculateMargin = (numColumn, index) => {
    const hasMargin = {
      top: true,
      bottom: true,
      left: true,
      right: true,
    };
    const length = this.props.children.length;

    numColumn = this.getNumColumn(numColumn);

    if (index % numColumn === 0) {
      hasMargin.left = false;
    }
    if (index % numColumn === numColumn - 1) {
      hasMargin.right = false;
    }
    if (index < numColumn) {
      hasMargin.top = false;
    }
    if (index >= length - (length % numColumn)) {
      hasMargin.bottom = false;
    }

    return hasMargin;
  };

  calculateWidth = (width, numColumn, margin, index) => {
    const { ratioWidthItem } = this.props;

    numColumn = this.getNumColumn(numColumn);

    const marginItem = ((numColumn - 1) * 2 * margin) / numColumn;

    return ratioWidthItem[index]
      ? (width * ratioWidthItem[index]) / 10 - marginItem
      : width / numColumn - marginItem;
  };

  calculateHeight = (width, scale) => {
    return scale.height !== 1 ? width / scale.height : null;
  };

  calculateWidthAndMarginItem = index => {
    const {
      margin,
      component,
      offsetWidth,
      numColumnMdSize,
      numColumnSmSize,
      numColumnLgSize,
      numColumnXsSize,
      MD_SIZE,
      SM_SIZE,
      XS_SIZE,
    } = this.props;

    const { width } = component;
    let tmpWidth = width - offsetWidth;

    if (tmpWidth < XS_SIZE) {
      return {
        width: this.calculateWidth(tmpWidth, numColumnXsSize, margin),
        hasMargin: this.calculateMargin(numColumnXsSize, index),
      };
    }

    if (tmpWidth < SM_SIZE) {
      return {
        width: this.calculateWidthByOffset(
          this.calculateWidth(tmpWidth, numColumnSmSize, margin, index),
          index,
        ),
        hasMargin: this.calculateMargin(numColumnSmSize, index),
      };
    }

    if (tmpWidth < MD_SIZE) {
      return {
        width: this.calculateWidthByOffset(
          this.calculateWidth(tmpWidth, numColumnMdSize, margin, index),
          index,
        ),
        hasMargin: this.calculateMargin(numColumnMdSize, index),
      };
    }

    return {
      width: this.calculateWidthByOffset(
        this.calculateWidth(tmpWidth, numColumnLgSize, margin, index),
        index,
      ),
      hasMargin: this.calculateMargin(numColumnLgSize, index),
    };
  };

  calculateWidthByOffset = (width, index) => {
    const { offsetWidthItem } = this.props;

    return width + (offsetWidthItem[index] ? offsetWidthItem[index] : 0);
  };

  render() {
    const { children, margin, scale, appendClass } = this.props;

    return (
      <div className={`responsive-wrapper ${appendClass}`}>
        {children.map((child, index) => {
          const { width, hasMargin } = this.calculateWidthAndMarginItem(index);
          const defaultWidth = '100%';
          return (
            <div
              key={index}
              style={{
                width: width || defaultWidth,
                height: this.calculateHeight(width, scale),
                marginTop: hasMargin.top ? margin : 0,
                marginBottom: hasMargin.bottom ? margin : 0,
                marginLeft: hasMargin.left ? margin : 0,
                marginRight: hasMargin.right ? margin : 0,
              }}
            >
              {child(width, this.calculateHeight(width, scale))}
            </div>
          );
        })}
      </div>
    );
  }
}

Responsive.propTypes = {
  appendClass: PropTypes.string,
  component: PropTypes.object.isRequired,
  numColumnLgSize: PropTypes.number,
  numColumnMdSize: PropTypes.number,
  numColumnSmSize: PropTypes.number,
  numColumnXsSize: PropTypes.number,
  offsetWidth: PropTypes.number,
  margin: PropTypes.number,
  offsetWidthItem: PropTypes.any,
  ratioWidthItem: PropTypes.any,
  scale: PropTypes.object,
  MD_SIZE: PropTypes.number,
  SM_SIZE: PropTypes.number,
  XS_SIZE: PropTypes.number,
};

Responsive.defaultProps = {
  appendClass: '',
  component: {},
  numColumnLgSize: 4,
  numColumnMdSize: 3,
  numColumnSmSize: 2,
  numColumnXsSize: 1,
  offsetWidth: 0,
  margin: 0,
  offsetWidthItem: [],
  ratioWidthItem: [],
  scale: { width: 1, height: 1 },
  MD_SIZE: 1500,
  SM_SIZE: 1000,
  XS_SIZE: 800,
};

export default Responsive;
