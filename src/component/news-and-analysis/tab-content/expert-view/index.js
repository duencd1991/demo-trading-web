import React, { Component } from 'react';
import { connect } from 'react-redux';
import Contributors from './list-tab/Contributors';
import Favorite from './list-tab/Favorite';
import MostPopular from './list-tab/MostPopular';
import MostRecent from './list-tab/MostRecent';
import Loading from './../../common/loading/Loading';
import ContributorInfo from './list-tab/Contributors/ChildTab/ContributorInfo';
import { Responsive } from '../../../common/responsive';

import { REDUCER_NAME } from '../../reducer';

class ExpertView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContributorTab: 0,
      currentContributorId: null,
      currentContributorWordId: null,
    };
    this.divRef = React.createRef();
  }

  getContributorsTab = (currentChildTab, expertId) => {
    if (currentChildTab === 3) {
      if (expertId) return <ContributorInfo />;
      return <Contributors />;
    }
  };

  render() {
    const {
      currentChildTab,
      contributorsData: {
        currentExpert: { expertId },
      },
    } = this.props;
    return (
      <div className="expert-wrapper">
        {currentChildTab === 1 && <MostRecent />}
        {currentChildTab === 2 && <MostPopular />}
        {this.getContributorsTab(currentChildTab, expertId)}
        {currentChildTab === 4 && <Favorite />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    component: state[REDUCER_NAME].component,
    currentChildTab: state[REDUCER_NAME].currentChildTab,
    contributorsData: state[REDUCER_NAME].contributorsData,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpertView);
