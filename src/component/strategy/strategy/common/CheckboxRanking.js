import React from 'react';
import _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import Const from './Const';
import './CheckboxRanking.scss';
import { connect } from 'react-redux';
class CheckboxRanking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { listCheckBox, handleChecked } = this.props;
    const listTitle = I18n.t('strategy.common');
    return (
      <div className="check-list-inline d-flex" style={{ minWidth: 300 }}>
        {Const.listCheckboxValueInvest.map((key, index) => {
          return (
            <div className="checkbox" key={key}>
              <input
                id={`cb-${index}`}
                type="checkbox"
                checked={listCheckBox ? listCheckBox[index].value : ''}
                onChange={() => handleChecked(key)}
              />
              <label htmlFor={`cb-${index}`}>
                <a>{listTitle[key]}</a>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(CheckboxRanking);
