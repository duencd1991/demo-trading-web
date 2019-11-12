import React from 'react'
import './index.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import Tooltip from '../tooltip'

const LIST_TAB = {
  'Level 1': 1,
  'Level 2': 2,
}
class SwitchTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listTab: [
        {value: `${I18n.t('priceDepth.action.lvl1')}`, isSelected: true, index: 1},
        {value: `${I18n.t('priceDepth.action.lvl2')}`, isSelected: false, index: 2},
      ]
    }
  }

  onclickTab = (value) => {
    const { listTab } = this.state
    const newListTab = listTab.map(
      (item) => {
        if (value === item.value) return {
          ...item,
          isSelected: true
        }

        return {
          ...item,
          isSelected: false
        }
      }
    )

    this.setState({ listTab: newListTab }, () => this.props.changeTab(LIST_TAB[value]) )
  }

  render() {
    //TODO purcharse const { isPremiumAccount } = this.props
    const isPremiumAccount = true
    const { listTab } = this.state
    return (
			<div className="switch-tab-wrapper">
        {listTab.map((item, index) => {
          return (
            <div key={item.value} className={`level-item ${index === 0 ? 'mr-3' : ''}`} onClick={() => this.onclickTab(item.value)}>
              <div className={`${item.isSelected ? 'level-item__title' : 'level-item__title level-item__title--grey'}`}>
                {item.value}
              </div>
              <div className={`${item.isSelected ? 'level-item__underline level-item__underline--selected' : 'level-item__underline'}`} />
            </div>
          )}
        )}
        {!isPremiumAccount && <Tooltip position={'right'}><i className="icon-padlock"/></Tooltip>}
			</div>
    );
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(SwitchTab);