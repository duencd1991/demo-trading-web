import React from 'react';
import _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import Const from './Const';
class filterImportance extends React.Component {
  getColor = key => {
    const LIST_COLOR = {
      Low: 'bg-l-color-3',
      Nomal: 'bg-s-color-4',
      High: 'bg-s-color-3',
    };
    return LIST_COLOR[key];
  };

  render() {
    const listTitle = I18n.t('economy.listImportance');
    const { listCheckBox, handleChecked } = this.props;

    return (
      <div className="check-list-inline" style={{ minWidth: 300 }}>
        <div className="list-check">
          <span className="title-check-list">
            {I18n.t('economy.listLabel.importance')}
          </span>
          {Const.listImportance.map((key, index) => {
            return (
              <div className="checkbox" key={key}>
                <input
                  id={`cb-${index}`}
                  type="checkbox"
                  checked={listCheckBox[index].value}
                  onChange={() => handleChecked(key)}
                />
                <label htmlFor={`cb-${index}`}>
                  <a
                    href="#"
                    className={`badge ${this.getColor(key)} text-white`}
                  >
                    {listTitle[key]}
                  </a>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default filterImportance;
