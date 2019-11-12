import React from 'react';
import ScoreBox from './../common/header/score-box';
import { connect } from 'react-redux';
import { fetchCompanyScore, REDUCER_NAME } from './reducer';
import { withComponentId } from './../../common/ComponentIdContext';
import { compose } from 'redux';


class Score extends React.Component {

  componentDidMount() {
    const { fetchCompanyScore, componentId } = this.props;

    fetchCompanyScore(this.getCode(), componentId);
  }

  getCode = () => {
    const { currentSearch = {}, dragCode } = this.props

    return dragCode ? dragCode.organCode : currentSearch.code
  }

  render() {
    const { data } = this.props;

    return (
      <ScoreBox data={data}/>
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    componentId,
    data: state[REDUCER_NAME].listMultiComponent[componentId].score,
    currentSearch: state[REDUCER_NAME].listMultiComponent[componentId].currentSearch,
  }
};

const mapDispatchToProps = ({
  fetchCompanyScore
});

export default compose(
  withComponentId,
  connect(mapStateToProps, mapDispatchToProps)
)(Score)
