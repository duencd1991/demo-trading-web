import React from 'react';
import { compose } from 'redux';
import withMarketPreOpen from '../../../common/market-pre-open/withMarketPreOpen';
import Footer from './../../../common/table/Footer';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import Content from './Content';

class Contribution extends React.Component {
  state = {
    height: 0,
  };
  onSize = size => {
    this.setState({ height: size.height });
  };

  render() {
    const { isFetching, component } = this.props;

    return (
      <div className={isFetching ? 'bg-blur' : ''}>
        <div
          style={{
            height: Math.max(this.state.height, component.height - 90),
          }}
        >
          <Content onSize={this.onSize} />
        </div>

        <div className="mt-20 mb-10">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state[REDUCER_NAME].isFetching,
    component: state[REDUCER_NAME].component,
  };
};

export default compose(
  connect(mapStateToProps),
  withMarketPreOpen('flex-fill'),
)(Contribution);
