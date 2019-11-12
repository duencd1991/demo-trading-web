import React, { PureComponent } from 'react';
import { Translate } from 'react-redux-i18n';
import PropTypes from 'prop-types';

class Title extends PureComponent {
  render() {
    return (
      <div className="consensus-history-title">
        <Translate value="consensusAnalysis.consensusHistory" />
      </div>
    );
  }
}

Title.propTypes = {};

export default Title;
