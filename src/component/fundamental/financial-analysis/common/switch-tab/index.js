import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

const LIST_TAB = {
  'FA Checkup': 1,
  'Financial Ratio': 2,
  'ZMF-Score': 3,
};
class SwitchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTab: [
        { value: `FA Checkup`, isSelected: true, index: 1 },
        { value: `Financial Ratio`, isSelected: false, index: 2 },
        { value: `ZMF-Score`, isSelected: false, index: 3 },
      ],
    };
  }

  onclickTab = value => {
    const { listTab } = this.state;
    const newListTab = listTab.map(item => {
      if (value === item.value)
        return {
          ...item,
          isSelected: true,
        };

      return {
        ...item,
        isSelected: false,
      };
    });

    this.setState({ listTab: newListTab }, () =>
      this.props.handleSwitchTab(LIST_TAB[value]),
    );
  };

  render() {
    const { listTab } = this.state;
    return (
      <div className="fa-switch-tab-wrapper  my-first-step">
        {listTab.map(item => {
          return (
            <div
              key={item.value}
              className={`level-item mr-3`}
              onClick={() => this.onclickTab(item.value)}
            >
              <div
                className={`${
                  item.isSelected
                    ? 'level-item__title'
                    : 'level-item__title level-item__title--grey'
                }`}
              >
                {item.value}
              </div>
              <div
                className={`${
                  item.isSelected
                    ? 'level-item__underline level-item__underline--selected'
                    : 'level-item__underline'
                }`}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(SwitchTab);
