import React from 'react';
import { connect } from 'react-redux';
import Toggle from '../../../common/Toggle';
import Button from '../Button';
import ListMyScreener from './ListScreener';
import { REDUCER_NAME, getUserScreeners } from '../reducer';

class MyScreener extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getUserScreeners } = this.props;
    getUserScreeners();
  }

  renderAction = toggle => {
    return (
      <Button buttonName={'stockScreener.button.MY_SCREEN'} onClick={toggle} />
    );
  };

  renderPopup = (showHide, isShow) => {
    const { userScreener = [] } = this.props;
    return (
      isShow && (
        <ListMyScreener
          showHide={showHide}
          listScreener={userScreener}
          editable={true}
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
  userScreener: state[REDUCER_NAME].userScreener,
});

const mapDispatchToProps = dispatch => ({
  getUserScreeners: () => dispatch(getUserScreeners()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyScreener);
