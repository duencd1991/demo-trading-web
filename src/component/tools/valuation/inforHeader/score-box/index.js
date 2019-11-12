import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../../reducer';
import ScoreBoxCommon from '../../../../fundamental/common/header/score-box';

class ScoreBox extends React.Component {
  render() {
    const { companyScore } = this.props;

    return <ScoreBoxCommon data={companyScore} />;
  }
}

const mapStateToProps = state => ({
  companyScore: state[REDUCER_NAME].companyScore,
});

export default connect(mapStateToProps)(ScoreBox);
