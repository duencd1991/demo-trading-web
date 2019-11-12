import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { connect } from 'react-redux';
import Item from './Item';
import { I18n } from 'react-redux-i18n';

class Tab extends React.Component {
  changeTab = pos => () => {
    const { changeTab } = this.props;

    changeTab(pos);
  };

  getClassName = () => {
    const { isLineLinkLeft } = this.props;

    return `nav nav-tabs m-tabs-line m-tabs-line--success custom-tabs 
    ${isLineLinkLeft && 'nav-line-link-left'}`;
  };

  render() {
    const { listTab, currentTab } = this.props;

    const tabs = Object.values(I18n.t(listTab)).map(value => {
      return { name: value };
    });

    return (
      <ul className={this.getClassName()}>
        {tabs.map((value, index) => {
          return (
            <Item
              key={index}
              {...value}
              isActive={currentTab === index + 1}
              changeTab={this.changeTab(index + 1)}
            />
          );
        })}
      </ul>
    );
  }
}

Tab.propTypes = {
  listTab: PropTypes.string.isRequired,
  currentTab: PropTypes.any,
  changeTab: PropTypes.func,
  isLineLinkLeft: PropTypes.bool,
};

Tab.defaultProps = {
  currentTab: 0,
  changeTab: () => {},
  isLineLinkLeft: false,
};

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(Tab);
