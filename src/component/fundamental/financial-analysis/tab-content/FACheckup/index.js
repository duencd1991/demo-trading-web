import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import './index.scss';
import FACheckupFooter from './FACheckupFooter';
import { connect } from 'react-redux';
import { REDUCER_NAME, fetchFACheckup } from '../../reducer';
import { compose } from 'redux';
import { withComponentId } from '../../../../common/ComponentIdContext';

class FACheckUp extends React.Component {
  componentDidMount() {
    const { fetchFaCheckup, searchParams, componentId } = this.props;
    const { code = 'AAA' } = searchParams;
    fetchFaCheckup(componentId, { OrganCode: code }, searchParams.isBanking);
  }

  render() {
    return (
      <div>
        <Table />
        <FACheckupFooter />
      </div>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    searchParams:
      state[REDUCER_NAME].listMultiComponent[componentId].searchParams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFaCheckup: (id, params) => dispatch(fetchFACheckup(id, params)),
  };
};

FACheckUp.propTypes = {
  fetchFaCheckup: PropTypes.func,
  searchParams: PropTypes.object,
  componentId: PropTypes.number,
};

FACheckUp.defaultProps = {
  fetchFaCheckup: () => {},
  searchParams: {},
  componentId: null,
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FACheckUp);
