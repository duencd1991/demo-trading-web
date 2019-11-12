import React from 'react';
import { connect } from 'react-redux';
import { createWatchList, toggleConfirmPopupCreateWatchList } from '../reducer';
import enhanceWithClickOutside from 'react-click-outside';
import Validation from './../../../helpers/Validation';
import { I18n } from 'react-redux-i18n';

const KEY_ENTER = 13;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      name: '',
    };

    this.nameRef = React.createRef();
  }

  toggle = () => {
    this.setState({ ...this.state, isShow: !this.state.isShow });
  };

  showHide = isShow => {
    this.setState({ ...this.state, isShow });
  };

  clearInputName = () => {
    this.nameRef.current.value = '';
  };

  cancel = () => {
    this.clearInputName();
    this.toggle();
  };

  create = name => {
    const { createWatchList, toggleConfirmPopupCreateWatchList } = this.props;

    const validation = new Validation(name);
    const messages = validation.check().messages;

    this.cancel();
    if (messages.length === 0) {
      createWatchList(validation.format(name));
    } else {
      toggleConfirmPopupCreateWatchList(true, messages);
    }
  };

  onKeyDown = e => {
    switch (e.keyCode) {
      case KEY_ENTER:
        this.create(this.nameRef.current.value);
        break;
      default:
        break;
    }
  };

  handleClickOutside = () => {
    if (this.state.isShow) {
      this.clearInputName();
      this.showHide(false);
    }
  };

  render() {
    const classNameDropdownMenuButton = this.state.isShow
      ? 'dropdown-menu drop-mecus drop-normal show'
      : 'dropdown-menu drop-mecus drop-normal';
    const classNameDropDown = this.state.isShow ? 'dropdown show' : 'dropdown';
    return (
      <div className="item-btn">
        <div className={classNameDropDown}>
          <button
            className="btn btn-cus bg-b-color-3 dropdown-toggle"
            title={I18n.t('watchListSummary.createNewWatchlistIcon')}
            type="button"
            onClick={this.toggle}
            aria-haspopup="true"
            aria-expanded={this.state.isShow}
          >
            <i className="icon-plus-s fs-11" />
          </button>
          <div
            className={classNameDropdownMenuButton}
            aria-labelledby="dropdownMenuButton"
            style={{
              position: 'absolute',
              transform: 'translate3d(-110px, 20px, 0px)',
              top: 0,
              right: 0,
              willChange: 'transform',
            }}
          >
            <div className="p-10">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control pr-20"
                  placeholder="Name your watchlist"
                  ref={this.nameRef}
                  onKeyDown={this.onKeyDown}
                />
                <button
                  className="btn-cancel-search"
                  type="button"
                  onClick={this.clearInputName}
                >
                  <i className="icon-cancel" />
                </button>
              </div>
              <div className="group-btn">
                <button
                  type="button"
                  className="btn btn-cus text-nomal bg-b-color-3"
                  onClick={() => this.create(this.nameRef.current.value)}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-cus text-nomal bg-s-color-3 float-right"
                  onClick={this.cancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

const mapDispatchToProps = {
  toggleConfirmPopupCreateWatchList,
  createWatchList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(enhanceWithClickOutside(Create));
