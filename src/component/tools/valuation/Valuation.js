import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME, fetchListSearch } from './reducer';
import ScrollComponent from './../../common/ScrollComponent';
import InforHeader from './InforHeader';
import FCFE from './method/FCFE';
import PE from './method/PE';
import PB from './method/PB';
import './index.scss';
import withPreRender from './../../common/withPreRender';
import { compose } from 'redux';
import ConstCommon from './../../common/Const';

class Valuation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'HPG',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSearch.code !== this.state.code) {
      this.setState({ code: nextProps.currentSearch.code });
      //call api valuation tool here
    }
  }

  componentDidMount() {
    const { fetchListSearch } = this.props;
    fetchListSearch();
  }

  render() {
    return (
      <ScrollComponent>
        <div className="valuation-wrapper pl-20 pr-20 h-100 d-flex flex-column">
          <div className="valuation-top-content">
            <InforHeader />
          </div>
          <div className="valuation-body-content">
            <div className="d-flex flex-column">
              <FCFE />
              <PE />
              <PB />
            </div>
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentSearch: state[REDUCER_NAME].currentSearch,
  };
};

const mapDispatchToProps = {
  fetchListSearch,
};

export default compose(
  withPreRender(ConstCommon.listComponent.Valuation),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Valuation);
