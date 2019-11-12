import React from 'react';
import DropDownItem from './DropDownItem';
import './index.scss';
import enhanceWithClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import ScrollComponent from '../ScrollComponent';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      isShowDropDown: false,
      inputText: null,
      inputKey: null,
    };
  }

  changeInputText = (key, text) => {
    this.setState({ inputKey: key, inputText: text });
  };

  toggleHover = isHover => {
    this.setState({ isHover });
  };

  toggleDropDown = isShowDropDown => {
    this.setState({ isShowDropDown });
  };

  resetDropDown = (isShowDropDown, isHover) => {
    this.setState({ isShowDropDown, isHover });
  };

  handleClickOutside() {
    // if (this.props.isEditable) {
    const { inputText, inputKey } = this.state;
    if (inputKey) {
      this.props.update(inputKey, inputText);
    }

    if (this.state.isShowDropDown) {
      this.setState({ isShowDropDown: false, isHover: false });
    }
    // }
  }

  render() {
    const {
      id,
      currentKey,
      listDataByKey,
      listKey,
      keyTitle,
      isEditable,
      change,
      update,
      deleteAction,
      isI18n,
      tooltipText,
    } = this.props;

    const currentOptionClass =
      id === currentKey
        ? 'btn drop-cus dropdown-toggle dropdown-active text-truncate'
        : 'btn drop-cus dropdown-toggle text-truncate';

    const currentOptionText = listDataByKey[currentKey]
      ? listDataByKey[currentKey][keyTitle]
      : '';
    const currentOptionTextI18n = isI18n
      ? I18n.t(currentOptionText)
      : currentOptionText;

    const current_option = (
      <button
        type="button"
        className={currentOptionClass}
        onClick={() => this.toggleDropDown(true)}
        aria-haspopup="true"
        aria-expanded="true"
      >
        {currentOptionTextI18n}
      </button>
    );

    const dropDownOptions = (
      <div
        className="dropdown-menu drop-mecus show"
        style={{
          position: 'absolute',
          willChange: 'transform',
          top: '0px',
          left: '0px',
          transform: 'translate3d(0px, 24px, 0px)',
        }}
      >
        <div>
          <ScrollComponent appendStyle={{ maxHeight: 145 }}>
            {listKey.map(value => {
              return (
                <DropDownItem
                  listDataByKey={listDataByKey}
                  isEditable={isEditable}
                  change={change}
                  currentKey={currentKey}
                  keyTitle={keyTitle}
                  key={value}
                  value={value}
                  isI18n={isI18n}
                  isHover={this.state.isHover}
                  toggleDropDown={this.toggleDropDown}
                  resetDropDown={this.resetDropDown}
                  changeInputText={this.changeInputText}
                  deleteAction={deleteAction}
                  update={update}
                  toggleHover={this.toggleHover}
                  tooltipText={tooltipText}
                />
              );
            })}
          </ScrollComponent>
        </div>
      </div>
    );

    return (
      <div className="item-filter">
        <div className="btn-group">
          {current_option}
          {this.state.isShowDropDown && dropDownOptions}
        </div>
      </div>
    );
  }
}

DropDown.propTypes = {
  id: PropTypes.any,
  currentKey: PropTypes.any,
  listKey: PropTypes.array,
  listDataByKey: PropTypes.object,
  change: PropTypes.func,
  keyTitle: PropTypes.string,
  isEditable: PropTypes.bool,
  update: PropTypes.func,
  deleteAction: PropTypes.func,
};

DropDown.defaultProps = {
  id: '',
  currentKey: '',
  listKey: [],
  listDataByKey: {},
  change: () => {},
  keyTitle: 'name',
  isEditable: false,
  update: () => {},
  deleteAction: () => {},
};

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(enhanceWithClickOutside(DropDown));
