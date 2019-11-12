import React from 'react';
import { connect } from 'react-redux';
import Toggle from '../../../common/Toggle';
import Button from '../Button';
import ListMyScreener from './ListScreener';
import { getTopScreeners, REDUCER_NAME } from '../reducer';

class TopScreener extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getTopScreeners } = this.props;
    getTopScreeners();
  }

  renderAction = toggle => {
    return (
      <Button buttonName={'stockScreener.button.TOP_SCREEN'} onClick={toggle} />
    );
  };

  renderPopup = (showHide, isShow) => {
    const { topScreener = [] } = this.props;
    return (
      isShow && (
        <ListMyScreener
          showHide={showHide}
          listScreener={topScreener}
          isTopScreener={true}
        />
      )
    );
  };

  render() {
    return (
      <Toggle renderAction={this.renderAction} renderPopup={this.renderPopup} />
    );
  }
}

const mapStateToProps = state => ({
  topScreener: state[REDUCER_NAME].topScreener,
});

const mapDispatchToProps = dispatch => ({
  getTopScreeners: () => dispatch(getTopScreeners()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopScreener);
