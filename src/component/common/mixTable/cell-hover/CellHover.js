import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import './cell-hover.scss';
import { compose } from 'redux';
import { setDragPopup } from '../../../main-layout/reducer';
import { toggleModal } from '../../../app/reducer';
import Const from '../../../common/Const';

const { listComponent } = Const;

const items = [
  {
    componentName: listComponent.Alerts,
    content: listComponent.Alerts,
    icon: 'icon-notification',
  },
  {
    componentName: listComponent.FinancialAnalysis,
    content: listComponent.FinancialAnalysis,
    icon: 'icon-financial-analysis',
  },
  {
    componentName: listComponent.TimeAndSales,
    content: listComponent.TimeAndSales,
    icon: 'icon-time-and-sales',
  },
  {
    componentName: listComponent.PriceDepth,
    content: listComponent.PriceDepth,
    icon: 'icon-price-depth',
  },
  {
    componentName: listComponent.News,
    content: listComponent.News,
    icon: 'icon-news-aggregator',
  },
  {
    componentName: listComponent.FASnapshot,
    content: listComponent.FASnapshot,
    icon: 'icon-snapshot',
  },
];

class CellHover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
      width: 0,
      height: 0,
      isShowIcon: false,
    };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.tr = this.root.closest('tr');
    this.tableWrapper = this.root.closest('table').parentNode.parentNode;
    this.tableWrapper.appendChild(this.el);

    this.tableWrapper.addEventListener('mousemove', this.onMouseMove);
    this.tableWrapper.addEventListener('mousedown', this.onMouseDown);
    this.tableWrapper.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    this.tableWrapper.removeChild(this.el);
    this.tableWrapper.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = e => {
    const { isShowPopup } = this.state;
    if (!isShowPopup || this.isDrag) {
      return;
    }
    if (!(this.tr.contains(e.target) || this.popup.contains(e.target))) {
      this.tr.classList.remove('hover');
      this.setState({
        isShowPopup: false,
      });
    }
  };

  onMouseDown = () => {
    this.isDrag = true;
  };

  onMouseUp = () => {
    this.isDrag = false;
  };

  showPopup = e => {
    let top = e.pageY - this.popup.scrollHeight;
    const isShowBottom =
      this.tableWrapper.getBoundingClientRect().top + this.popup.scrollHeight >
      e.pageY;

    if (isShowBottom) {
      top = e.pageY;
    }
    this.setState({
      top: top,
      isShowPopup: true,
      left: e.pageX,
    });
  };

  handleClickOutside = () => {
    if (this.state.isShowPopup) {
      this.tr.classList.remove('hover');
      this.setState({
        isShowPopup: false,
      });
    }
  };

  showDragPopup = (item, organCode) => {
    const { setDragPopup } = this.props;
    setDragPopup({
      ...item,
      organCode,
      isShow: true,
    });
  };

  renderChild = () => {
    const { isShowPopup, left, top } = this.state;
    const { organCode, toggleModal } = this.props;
    return (
      <div
        ref={el => (this.popup = el)}
        style={{
          left,
          top,
          maxHeight: isShowPopup ? 500 : 0,
        }}
        className="watchlist-popup"
      >
        <div className="watchlist-popup__header d-flex align-items-center justify-content-between">
          <div
            onClick={() => toggleModal(true)}
            className="watchlist-popup__header--buy"
          >
            BUY
          </div>
          <div
            onClick={() => toggleModal(true)}
            className="watchlist-popup__header--sell"
          >
            SELL
          </div>
        </div>
        <div className="watchlist-popup__body d-flex flex-column">
          {items.map(item => {
            return (
              <div
                key={item.componentName}
                onClick={() => this.showDragPopup(item, organCode)}
                className="watchlist-popup__body--item"
              >
                <i className={item.icon} />
                <Translate
                  value={`common.listComponent.${item.componentName}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { children, isShowDeleteIcon, handleDelete } = this.props;
    return (
      <div
        style={{
          minWidth: 100,
          position: 'relative',
          zIndex: 22,
        }}
        className="d-flex align-items-center"
        ref={el => (this.root = el)}
      >
        {children}
        <div className="mr-2 cell-hover-icon">
          <div className="d-flex">
            <div
              onClick={this.showPopup}
              className="circle d-flex justify-content-center align-items-center bg-b-color-6"
            >
              <div className="triangle-up" />
            </div>
            {isShowDeleteIcon && (
              <i
                className="icon-bin-delete text-b-color-6 fs-16"
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
        {ReactDOM.createPortal(this.renderChild(), document.body)}
      </div>
    );
  }
}

CellHover.propTypes = {
  rowIndex: PropTypes.number,
  isShowDeleteIcon: PropTypes.bool,
  handleDelete: PropTypes.func,
  setDragPopup: PropTypes.func.isRequired,
  organCode: PropTypes.string,
};

CellHover.defaultProps = {
  rowIndex: -1,
  isShowDeleteIcon: true,
  handleDelete: () => {},
  organCode: '',
};

const mapDispatchToProps = {
  setDragPopup,
  toggleModal,
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  enhanceWithClickOutside,
)(CellHover);
