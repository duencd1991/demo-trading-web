import React from 'react';
import { I18n } from 'react-redux-i18n';
import {
  formatPercent,
  formatTextFloat,
  formatValueBillion,
  formatPrice,
  formatValue,
} from '../../../helpers/Text';
import Const from '../Const';

const Arrow = require('../../../../assets/images/svg/fundamental/arrow.svg');

class ScreenerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowScreenerDetail: false,
      isShowConfirmEdit: false,
      isShowConfirmDelete: false,
    };
    this.inputEditRef = React.createRef();
  }

  showHideScreenerDetail(e, isShowScreenerDetail) {
    this.setState({ isShowScreenerDetail: !isShowScreenerDetail });
  }

  showConfirmDelete(isShowConfirmDelete) {
    this.setState({ isShowConfirmDelete: !isShowConfirmDelete });
  }

  getFormatParamRange = (param, type) => {
    if (type === Const.unitType.BillionVND.key) {
      return formatTextFloat(formatValueBillion(param));
    }
    if (type === Const.unitType.MillionVND.key) {
      return formatTextFloat(formatValue(param));
    }
    if (
      type === Const.unitType.ThousandVND.key ||
      type === Const.unitType.ThousandUnit.key
    ) {
      return formatTextFloat(formatPrice(param));
    }
    if (type === Const.unitType.Percentage.key) {
      return formatPercent(param);
    }
    return formatTextFloat(param, 0);
  };

  handleDelete(id) {
    const { deleteAction, showHide } = this.props;
    deleteAction(id);
    showHide(false);
    this.resetState();
  }

  showActionEdit() {
    this.resetState();
    this.setState({ isShowConfirmEdit: true });
  }

  showActionDelete() {
    this.resetState();
    this.setState({ isShowConfirmDelete: true });
  }

  changeInputText = text => {
    this.setState({ inputText: text });
  };

  handleEdit = id => {
    this.resetState();
    const name = this.inputEditRef.current.value.trim();
    this.props.editAction(id, name);
    this.props.showHide(false);
  };

  resetState = () => {
    this.setState({
      isShowScreenerDetail: false,
      isShowConfirmEdit: false,
      isShowConfirmDelete: false,
    });
  };

  cancel = () => {
    this.resetState();
    this.props.showHide(false);
  };

  onChangeScreener = (...params) => {
    const { changeScreener, showHide } = this.props;
    changeScreener(...params);
    showHide(false);
  };

  render() {
    const { screener, isTopScreener } = this.props;
    const settings = JSON.parse(screener.settings);
    const parameters = settings.parameters || [];

    const {
      isShowScreenerDetail,
      isShowConfirmEdit,
      isShowConfirmDelete,
    } = this.state;

    const detailContent = (
      <>
        {parameters.length > 0 && <hr />}
        {parameters.map((value, index) => {
          return (
            <div key={index} className="detail-param">
              <span>{value.name}</span>
              {value.type != Const.paramType.BOOLEAN && (
                <span className="float-right">
                  {this.getFormatParamRange(value.selectedValue[0], value.unit)}{' '}
                  {Const.unitType[value.unit].text}-{' '}
                  {this.getFormatParamRange(value.selectedValue[1], value.unit)}{' '}
                  {Const.unitType[value.unit].text}
                </span>
              )}
              {value.type == Const.paramType.BOOLEAN && (
                <span className="float-right">
                  {this.getFormatParamRange(value.selectedValue[0], value.unit)}
                </span>
              )}
            </div>
          );
        })}
      </>
    );

    let content = (
      <div className="d-flex justify-content-between">
        <div
          className="screener-name text-truncate"
          onClick={() =>
            this.onChangeScreener(screener.screenerId, isTopScreener)
          }
        >
          {screener.name}
        </div>
        <div
          className="expand-button"
          onClick={e =>
            this.showHideScreenerDetail(e, this.state.isShowScreenerDetail)
          }
        >
          <img className="expand-status-icon float-right" src={Arrow} />
        </div>
      </div>
    );

    if (isShowConfirmEdit) {
      content = (
        <div className="screener-expand">
          <div className="d-flex">
            <input
              className="text-input"
              autoFocus
              type="text"
              style={{ width: 120 }}
              onChange={e => this.changeInputText(e.target.value)}
              ref={this.inputEditRef}
              defaultValue={screener.name}
            />
            <span className="float-right">
              <span
                className="text-s-color-5 fs-16 mr-5"
                onClick={() => this.handleEdit(screener.screenerId)}
              >
                <i className="icon-correct" />
              </span>
              <span className="text-s-color-3 fs-13 mr-5" onClick={this.cancel}>
                <i className="icon-remove-symbol" />
              </span>
              <span>
                <img
                  style={{ transform: 'rotate(90deg)' }}
                  className="expand-status-icon float-right mt-10"
                  src={Arrow}
                  onClick={e => this.cancel()}
                />
              </span>
            </span>
          </div>
          {detailContent}
        </div>
      );
    }

    if (isShowConfirmDelete) {
      content = (
        <div className="confirm-delete">
          <div>{I18n.t('stockScreener.screenerMessage.confirmDelete')}</div>
          <div>
            <div className="btn-edit pt-10 pb-5">
              <div
                className="btn active btn-cus-nomal bg-b-color-3 mr-5"
                onClick={() => this.handleDelete(screener.screenerId)}
              >
                {I18n.t('stockScreener.button.DELETE')}
              </div>
              <div
                className="btn btn-cus-nomal btn-cancel-delete ml-5"
                onClick={this.cancel}
              >
                {I18n.t('stockScreener.button.CANCEL')}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isShowScreenerDetail) {
      content = (
        <div className="screener-expand">
          <div className="d-flex">
            <div
              className="screener-name text-truncate"
              onClick={() =>
                this.onChangeScreener(screener.screenerId, isTopScreener)
              }
            >
              <span>{screener.name}</span>
            </div>

            {!isTopScreener && (
              <span className="float-right">
                <span
                  className="mr-5"
                  onClick={() =>
                    this.showActionEdit(this.state.isShowConfirmEdit)
                  }
                >
                  <i className="icon-pencil-edit" />
                </span>
                <span
                  className="mr-5"
                  onClick={() => this.showActionDelete(screener.screenerId)}
                >
                  <i className="icon-bin-delete" />
                </span>
              </span>
            )}
            <div
              className="expand-button"
              onClick={e =>
                this.showHideScreenerDetail(e, this.state.isShowScreenerDetail)
              }
            >
              <img
                style={{ transform: 'rotate(90deg)' }}
                className="expand-status-icon float-right pt-5"
                src={Arrow}
              />
            </div>
          </div>
          {detailContent}
        </div>
      );
    }
    return (
      <div className="screener-item">
        <div className="screener-item-content">{content}</div>
      </div>
    );
  }
}

export default ScreenerItem;
