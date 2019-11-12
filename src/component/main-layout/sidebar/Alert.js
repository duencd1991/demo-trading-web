import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import { toggleIntro } from '../../app/reducer';

const AlertController = props => {
  const alert = useAlert();

  return (
    <Fragment>
      <li>
        <a onClick={() => { alert.show(''); }}>
          <i className="icon-settings" />
        </a>
      </li>
      <li>
        <a onClick={() => {const { isShowIntro, toggleIntro } = props;toggleIntro(!isShowIntro);}}>
          <i className="icon-settings" />
        </a>
      </li>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isShowIntro: state.isShowIntro,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleIntro: status => dispatch(toggleIntro(status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertController);
