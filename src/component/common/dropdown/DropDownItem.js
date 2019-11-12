import React from 'react';
import { I18n } from 'react-redux-i18n';

class DropDownItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowActionEditDelete: false,
      isShowConfirmEdit: false,
      isShowConfirmDelete: false,
    };
    this.inputEditRef = React.createRef();
    this.check = 0;
  }

  showActionEditDelete = () => {
    if (!this.props.isHover) {
      this.setState({ isShowActionEditDelete: true });
    }
  };

  hideActionEdit = () => {
    this.setState({ isShowActionEditDelete: false });
  };

  handleEdit = () => {
    this.check = 1;
    this.setState({ isShowConfirmEdit: true });
    this.props.toggleHover(true);
  };

  handleDelete = () => {
    this.check = 1;
    this.setState({ isShowConfirmDelete: true });
    this.props.toggleHover(true);
  };

  handleChange = () => {
    const { currentKey, value, change } = this.props;

    const check = this.check;
    if (check !== 1) {
      this.check = 0;
      change(value, currentKey);
      this.resetState();
    } else {
      this.inputEditRef.current && this.inputEditRef.current.focus();
    }
  };

  acceptChange = (key) => {
    this.check = 1;
    this.resetState();
    const name = this.inputEditRef.current.value.trim();
    this.props.update(key, name);
  };

  acceptDelete = (key) => {
    this.check = 1;
    this.resetState();
    this.props.deleteAction(key);
  };

  cancel = () => {
    this.resetState();
  };

  resetState = () => {
    this.setState({
      isShowActionEditDelete: false,
      isShowConfirmEdit: false,
      isShowConfirmDelete: false,
    });
    this.props.resetDropDown(false, false);
  };

  changeInputText = (key, value) => {
    this.props.changeInputText(key, value);
  };

  render() {
    const {
      value,
      listDataByKey,
      isEditable,
      change,
      currentKey,
      toggleDropDown,
      keyTitle,
      isI18n,
      title,
      tooltipText,
    } = this.props;

    const {
      isShowActionEditDelete,
      isShowConfirmEdit,
      isShowConfirmDelete
    } = this.state;

    let content = listDataByKey[value][keyTitle];
    const optionText = isI18n ? I18n.t(listDataByKey[value][keyTitle]) : listDataByKey[value][keyTitle];

    if (isShowActionEditDelete) {
      content = (
        <>
           <span className="btn-edit">
            <span onMouseUp={this.handleEdit}><i className="icon-pencil-edit"/></span>
            <span onMouseUp={this.handleDelete}><i className="icon-bin-delete"/></span>
           </span>
          <div
            style={{ width: 50 }}
            className="text-truncate"
            title={tooltipText ? I18n.t(tooltipText): (optionText || '')}>
            {optionText}
          </div>
        </>
      );
    }
    if (isShowConfirmEdit) {
      content = (
        <form onSubmit={() => this.acceptChange(value)}>
          <input className="text-input" autoFocus type="text" style={{ width: 50 }}
                 onChange={(e) => this.changeInputText(value, e.target.value)} ref={this.inputEditRef}
                 defaultValue={optionText}/>
          <span className="btn-edit">
            <span className="text-s-color-5 fs-16" onClick={() => this.acceptChange(value)}><i
              className="icon-correct"/></span>
            <span className="text-s-color-3 fs-13" onClick={this.cancel}><i className="icon-remove-symbol"/></span>
          </span>
        </form>
      );
    }

    if (isShowConfirmDelete) {
      content = (
        <>
          <div className="text-l-color-2 text-truncate"
               style={{ width: 50 }}>{I18n.t('watchListSummary.confirmDelete')}</div>
          <span className="btn-edit">
            <span className="text-s-color-5 fs-16" onClick={() => this.acceptDelete(value)}><i
              className="icon-correct"/></span>
            <span className="text-s-color-3 fs-13" onClick={this.cancel}><i className="icon-remove-symbol"/></span>
          </span>
        </>
      );
    }

    return isEditable
      ? <a
        title={title || ''}
        className="dropdown-item"
        href="javascript:void(0)"
        onMouseUp={this.handleChange}
        onMouseLeave={this.hideActionEdit}
        onMouseEnter={this.showActionEditDelete}>
        {content}
      </a>
      : <a
        title={tooltipText ? I18n.t(tooltipText) : optionText}
        className="dropdown-item"
        href="javascript:void(0)"
        onMouseUp={() => {
          change(value, currentKey);
          toggleDropDown(false);
        }}>
        {optionText}
      </a>;
  }
}

export default DropDownItem;
