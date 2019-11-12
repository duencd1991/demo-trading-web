import React from 'react'
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

const LIST_TAB = {
  'Most Recent': 1,
  'Most Popular': 2,
  'Contributors': 3,
  'Favorite': 4,
}
class SwitchChildTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listTab: [
        {value: `Most Recent`, isSelected: true, index: 1},
        {value: `Most Popular`, isSelected: false, index: 2},
        {value: `Contributors`, isSelected: false, index: 3},
        {value: `Favorite`, isSelected: false, index: 4},
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
    this.setState({ listTab: newListTab },
      () => this.props.handleSwitchTab(LIST_TAB[value], 'currentChildTab'))
  }

  render() {
    const { listTab } = this.state
    return (
      <div className="d-flex">
        {
          listTab.map((item, index)=>(
            <a 
              key={index}
              href="#"
              className={`btn btn-cus-nomal bg-b-color-3 ml-5 ${item.isSelected ? 'active' : ''}`}
              onClick={()=> this.onclickTab(item.value)}
            >
              {item.value}
            </a>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(SwitchChildTab);