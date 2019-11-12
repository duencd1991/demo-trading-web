import React from 'react';
import { connect } from 'react-redux';
import Const from './Const';
import { REDUCER_NAME } from '../reducer';
import { I18n } from 'react-redux-i18n';
import PopupWarning from './../../../common/popup-portal/popup-warning/PopupWarning';
class PopupWarningNoTicker extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isShowPopup: false,
    };
    this.state = this.initialState;
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    let isShowPopup = false;
    const { organCodeHover, ids, industryId, page } = this.props;
    let idHover = organCodeHover;
    if (
      !ids.includes(organCodeHover) &&
      organCodeHover != '' &&
      !(
        organCodeHover === prevProps.organCodeHover &&
        industryId === prevProps.industryId &&
        page > 1
      )
    ) {
      idHover = '';
      isShowPopup = true;
    }
    if (organCodeHover !== prevProps.organCodeHover || ids !== prevProps.ids) {
      this.setState({ isShowPopup: isShowPopup, idHover: idHover });
    }
  }
  render() {
    const { parentRef } = this.props;
    const { isShowPopup } = this.state;
    if (!isShowPopup) return null;
    return (
      <PopupWarning
        text={I18n.t('stRanking.popup.warning.title')}
        isShow={isShowPopup}
        onOverlayClicked={true}
        textContent={I18n.t('stRanking.popup.warning.content')}
        parentRef={parentRef ? parentRef.current : null}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ids: state[REDUCER_NAME].listTickerRanking,
    industryId: state[REDUCER_NAME].industryId,
    organCodeHover: state[REDUCER_NAME].organCodeHover,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupWarningNoTicker);
