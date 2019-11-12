import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withComponentId } from './../../../../common/ComponentIdContext';
import { REDUCER_NAME } from '../../reducer';

class THeadCustom extends PureComponent {
  renderChild = () => {
    const { title = '--', subTitle = '--', children } = this.props;

    return (
      <>
        <span>{title}</span>
        {children}
        <br />
        <small className="small-text">{subTitle}</small>
      </>
    );
  };

  render() {
    const { isDropDown } = this.props;

    return isDropDown ? (
      <div className="fa-checkup-dropdown-search-box">
        <div className="dropdown drop-sort">{this.renderChild()}</div>
      </div>
    ) : (
      <div>{this.renderChild()}</div>
    );
  }
}

THeadCustom.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDropDown: PropTypes.bool,
};

THeadCustom.defaultProps = {
  title: '--',
  subTitle: '--',
  isDropDown: true,
};

const mapStateToProps = (state, { componentId }) => {
  return {
    subTitle:
      state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
        .yearReport,
  };
};

export default compose(
  withComponentId,
  connect(mapStateToProps),
)(THeadCustom);
