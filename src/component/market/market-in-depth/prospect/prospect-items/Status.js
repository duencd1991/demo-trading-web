import React from 'react';
import { I18n } from 'react-redux-i18n';
import BEAR_ICON from '../icons/bear.svg';
import BULL_ICON from '../icons/bull.svg';

const Status = ({ value }) => {
  if (value > 0) {
    return (
      <div className="prospect-item__content">
        <div className="prospect-item__up">
          <h3>{I18n.t('marketInDepthProspect.prospectItem.Up')}</h3>
          <span>
              <i className="icon-up" />
            </span>
        </div>
        <div className="prospect-item__icon">
          <img src={BULL_ICON} alt="bull icon" />
        </div>
      </div>
    );
  }

  if (value < 0) {
    return (
      <div className="prospect-item__content">
        <div className="prospect-item__up">
          <h3>{I18n.t('marketInDepthProspect.prospectItem.Down')}</h3>
          <span>
                <i className="icon-down" />
              </span>
        </div>
        <div className="prospect-item__icon">
          <img src={BEAR_ICON} alt="bear icon" />
        </div>
      </div>
    );
  }

  return (
    <div className="prospect-item__content">
      <div className="prospect-item__up">
        <h3>NEUTRAL</h3>
      </div>
      <div className="prospect-item__icon">
        <div className="newtral-icon" />
      </div>
    </div>
  );
};

export default Status;
