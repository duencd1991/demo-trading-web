import React from 'react';
import './loading.scss';

const LoadingImage = require('../../../../../assets/images/loading.gif');

const Loading = () => (
  <div className="loading-ts">
    <img alt="loading" src={LoadingImage} />
  </div>
);

export default Loading;
