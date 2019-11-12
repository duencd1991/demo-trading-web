import React, { Component } from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

class List extends Component {
  render() {
    const tabs = Object.values(I18n.t(this.props.listTab)).map(value => {
      return { name: value };
    });

    let className =
      'tab-timer nav nav-tabs m-tabs-line m-tabs-line--success custom-tabs mt-2 mb-10';

    className =
      this.props.disableTabNormal === true
        ? className
        : ['tab-normal', className].join(' ');

    return (
      <ul className={className} role="tablist">
        {tabs.map((value, index) => {
          return (
            <Item
              key={index}
              {...value}
              isActive={this.props.currentTab === index + 1}
              changeTab={() => this.props.changeTab(index + 1)}
            />
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(List);
