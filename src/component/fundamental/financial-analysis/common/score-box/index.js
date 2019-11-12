import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withComponentId } from "../../../../common/ComponentIdContext";
import { REDUCER_NAME} from "../../reducer";
import ScoreBoxCommon from "../../../common/header/score-box"

class ScoreBox extends React.Component {

  render() {
    const { companyScore } = this.props
    return (
			<ScoreBoxCommon data={companyScore} />
    );
  }
}

const mapStateToProps = (state, { componentId }) => ({
  companyScore: state[REDUCER_NAME].listMultiComponent[componentId].companyScore,
});

export default compose( withComponentId, connect(mapStateToProps))(ScoreBox)
