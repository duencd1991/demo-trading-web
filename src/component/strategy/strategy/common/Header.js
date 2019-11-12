import React from 'react';
import { connect } from 'react-redux';
import ValueInvestment from './ValueInvestment';
import CheckboxRanking from './CheckboxRanking';
import { REDUCER_NAME, setTypeRanking } from '../fiinTradeStrategy/reducer';
import './Header.scss';
import Export from './Export';
import { I18n } from 'react-redux-i18n';
import Responsive from '../../../common/responsive/Responsive';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCheckBox: [
        {
          key: 'industry',
          value: true,
        },
        {
          key: 'group',
          value: false,
        },
      ],
    };
  }

  handleChecked = key => {
    const clone = [...this.state.listCheckBox];
    const newClone = clone.map(item => {
      if (item.key === key) {
        if (!item.value) {
          return {
            ...item,
            value: !item.value,
          };
        }
      } else {
        return {
          ...item,
          value: false,
        };
      }
      return item;
    });
    this.setState({ listCheckBox: newClone });
    this.props.setTypeRanking(key);
  };

  render() {
    const {
      title,
      isShowCheckbox,
      firstStrName,
      secondStrName,
      color,
    } = this.props;

    return (
      <>
        <div className="value-header d-flex">
          <ValueInvestment
            title={title}
            firstStrName={firstStrName}
            secondStrName={secondStrName}
            color={color}
          />
          {isShowCheckbox && (
            <CheckboxRanking
              listCheckBox={this.state.listCheckBox}
              handleChecked={this.handleChecked}
            />
          )}
        </div>
        <div className="calculated d-flex justify-content-between mb-5">
          <span className="strCalculated">
            {I18n.t('strategy.strCalculated')}
          </span>
          <Export />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  typeRanking: state[REDUCER_NAME].typeRanking,
  i18n: state.i18n,
});

const mapDispatchToProps = {
  setTypeRanking,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
