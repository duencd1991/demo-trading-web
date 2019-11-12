import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import './ValueInvestment.scss';
import Const from './Const';

class ValueInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, firstStrName, secondStrName, color } = this.props;
    const getStyleColor = color => {
      let styleb = {
        backgroundColor: color,
      };
      return styleb;
    };
    return (
      <div>
        <div className="value-investment">
          <div className="Rectangle" style={getStyleColor(color)}>
            <span className="Vis">{I18n.t(title)}</span>
          </div>
          <div className="value-text">
            <div className="Value-Investment-Str">
              <span>{firstStrName ? I18n.t(firstStrName) : ''}</span>
            </div>
            <div className="HIGH-RANKING-A-VAL">
              <span>{secondStrName ? I18n.t(secondStrName) : ''}</span>
            </div>
          </div>

          <div className="Rectangle-4">
            <div className="Rectangle-5">
              <span className="RETURN">{I18n.t('strategy.return')}</span>
            </div>
            <div className="Rectangle-6">
              <div className="number">322</div>
              <div className="number-percent">.15%</div>
            </div>
          </div>

          <div className="Rectangle-Index">
            <div className="Rectangle-5">
              <span className="RETURN">{I18n.t('strategy.vnIndex')}</span>
            </div>
            <div className="Rectangle-6">
              <div className="number">218</div>
              <div className="number-percent">.56%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  theme: state.theme,
});

export default connect(mapStateToProps)(ValueInvestment);
