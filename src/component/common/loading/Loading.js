import React from 'react';
import './loading.scss';
import withSwitchTheme from '../withSwitchTheme';
import { THEMES } from './../../../configs/LayoutConfig';

const LoadingImageDark = require('../../../assets/images/loading_dark.gif');
const LoadingImageLight = require('../../../assets/images/loading_light.gif');

const Loading = ({ SETTINGS }) => {
  return (
    <div className="loading-spinner">
      <img
        alt="loading"
        src={
          SETTINGS.type === THEMES.DARK ? LoadingImageDark : LoadingImageLight
        }
      />
    </div>
  );
};

export default withSwitchTheme({
  [THEMES.DARK]: {
    type: THEMES.DARK,
  },
  [THEMES.LIGHT]: {
    type: THEMES.LIGHT,
  },
})(Loading);
