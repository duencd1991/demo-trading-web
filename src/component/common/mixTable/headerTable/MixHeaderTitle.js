import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import Toggle from './../../Toggle';
import './HeaderTable.scss';
import ScrollComponent from './../../../common/ScrollComponent';

class MixHeaderTitle extends React.Component {
  renderAction = toggle => {
    return (
      <button
        className="dropdown-toggle"
        type="button"
        aria-haspopup="true"
        onClick={toggle}
        aria-expanded="false"
      >
        <i className="icon-caret ml-2" />
      </button>
    );
  };

  handleClick = (key, showHide) => () => {
    const { chooseItem } = this.props;
    showHide(false);
    chooseItem(key);
  };

  renderPopup = (showHide, isShow) => {
    const className = isShow
      ? 'mix dropdown-menu dropdown-menu-left drop-th drop-mecus show'
      : 'dropdown-menu dropdown-menu-left drop-th drop-mecus';

    const { listIndustry } = this.props;
    const newLists = listIndustry ? listIndustry : [];
    return (
      <div className={className} aria-labelledby="dropdownMenuButton">
        <ScrollComponent appendStyle={{ maxHeight: 150 }}>
          {newLists.length > 0 &&
            newLists.map((key, index) => {
              return (
                <a
                  className="dropdown-item"
                  key={index}
                  onClick={this.handleClick(key, showHide)}
                >
                  {key}
                </a>
              );
            })}
        </ScrollComponent>
      </div>
    );
  };

  render() {
    const { children } = this.props;
    const title = I18n.t(children);

    return (
      <div>
        {title}
        <div className="dropdown drop-sort">
          <Toggle
            renderAction={this.renderAction}
            renderPopup={this.renderPopup}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MixHeaderTitle);
