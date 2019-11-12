import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './drag-popup.scss';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { compose } from 'redux';
import { componentLimit } from '../../../configs/WidgetConfig';
import CommonCost from '../../common/Const';
import { checkIsBank } from '../../helpers/Common';
import Layout from '../../helpers/Layout';
import { REDUCER_NAME, setDragPopup } from '../reducer';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from '../../app/commonReducer';
import { Translate } from 'react-redux-i18n';

class DragPopup extends PureComponent {
  rootRef = React.createRef();
  listPopout = {};

  componentDidMount() {
    Layout.layout.on('componentCreated', this.onComponentCreated);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { popup } = this.props;
    const listComponentTitle = I18n.t('common.listComponent');
    if (popup !== prevProps.popup && popup.isShow) {
      Layout.drag(
        this.rootRef.current,
        {
          title: listComponentTitle[popup.componentName],
          name: popup.componentName,
          tooltip: listComponentTitle[popup.componentName],
        },
        { dragCode: this.getCode() },
      );
    }
    this.keyUpListener(prevProps);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }

  keyUpListener = prevProps => {
    const { popup } = this.props;
    const { popup: prevPopup } = prevProps;
    if (popup.isShow && !prevPopup.isShow) {
      window.addEventListener('keyup', this.onKeyUp);
    }

    if (!popup.isShow && prevPopup.isShow) {
      window.removeEventListener('keyup', this.onKeyUp);
    }
  };

  onKeyUp = e => {
    const { setDragPopup } = this.props;
    if (e.keyCode === 27) {
      setDragPopup({
        isShow: false,
      });
      window.removeEventListener('keyup', this.onKeyUp);
    }
  };

  getCode = () => {
    const { popup, listOrganizationByOrganCode } = this.props;
    const ticker = listOrganizationByOrganCode[popup.organCode];
    if (!ticker) {
      return null;
    }
    return {
      ...ticker,
      exchange: CommonCost.listExchange[ticker.comGroupCode],
      isBank: checkIsBank(ticker.comTypeCode),
    };
  };

  onComponentCreated = () => {
    const { setDragPopup } = this.props;
    setDragPopup({
      isShow: false,
    });
  };

  onClick = e => {
    const { setDragPopup } = this.props;
    if (!this.rootRef.current.contains(e.target)) {
      setDragPopup({
        isShow: false,
      });
    }
  };

  showPopout = () => {
    const { popup } = this.props;
    const popout = Layout.layout.createPopout(
      {
        componentName: popup.componentName,
        component: popup.componentName,
        type: 'react-component',
        title: I18n.t(`common.listComponent.${popup.componentName}`),
      },
      {
        width: window.screen.width / 2,
        height: window.screen.height,
        left: 50,
        top: 50,
      },
    );
    popout._popoutWindow.onload = () => {
      const popIn = popout._popoutWindow.document.querySelector('.lm_popin');
      popIn.parentNode.removeChild(popIn);
    };
    return popout;
  };

  openPopout = e => {
    e.preventDefault();
    const { popup, setDragPopup } = this.props;
    setDragPopup({
      isShow: false,
    });
    if (componentLimit[popup.componentName] === -1) {
      this.showPopout();
    }

    if (
      this.listPopout[popup.componentName] &&
      !this.listPopout[popup.componentName]._popoutWindow.closed
    ) {
      this.listPopout[popup.componentName]._popoutWindow.focus();
      return;
    }
    this.listPopout[popup.componentName] = this.showPopout();
  };

  render() {
    const { popup } = this.props;
    if (!popup.isShow) {
      return null;
    }
    return (
      <div className="drag-popup" onClick={this.onClick}>
        <div ref={this.rootRef} className="drag-popup-content">
          <div className="drag-popup-header">{popup.content}</div>
          <div className="drag-popup-body">
            <div>
              <span>
                <Translate value={'common.labelPopupDragComponent'} />
              </span>
            </div>
            <a onClick={this.openPopout} href="javascript:void(0)">
              <i className="icon-pop-out" />
              <Translate value={'common.POPOUT'} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DragPopup.propTypes = {
  popup: PropTypes.object.isRequired,
  setDragPopup: PropTypes.func.isRequired,
  listOrganizationByOrganCode: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    popup: state[REDUCER_NAME].dragPopup,
    listOrganizationByOrganCode:
      state[COMMON_REDUCER_NAME].listOrganizationByOrganCode,
  };
};

const mapDispatchToProps = {
  setDragPopup,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DragPopup);
