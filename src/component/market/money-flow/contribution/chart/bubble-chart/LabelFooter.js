import React from 'react';
import { Translate } from 'react-redux-i18n';

class LabelFooter extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Translate
          value="moneyFlowContribution.LABEL_CHART_BOTTOM"
          style={{ opacity: 0.6, fontSize: '12px' }}
        />
      </div>
    );
  }
}

export default LabelFooter;
