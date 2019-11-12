import React from 'react';
import Const from './Const';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import './MixChart.scss';
import { I18n } from 'react-redux-i18n';
class ChartFooter extends React.PureComponent {
  render() {
    const { listLegend, theme } = this.props;

    const isDark = theme === 'dark' ? true : false;
    return (
      <div className="chart-legend-wraper">
        {listLegend.map((item, index) => {
          const color = isDark
            ? item.color
            : item.colorLight
            ? item.colorLight
            : item.color;
          const strLegendName = I18n.t(item.name);
          if (item.type === Const.BARCHART) {
            const idKey = item.type + moment().unix() + index;

            return (
              <div key={idKey} className="legend-item legend-stack-bar">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      '#' + idKey + ':after {',
                      'background-color: ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="square-barChart-text" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
          if (item.type === Const.GROUPCHART) {
            const idKey = item.type + moment().unix() + index;
            return (
              <div key={idKey} className="legend-item legend-stack-bar">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      '#' + idKey + ':after {',
                      'background-color: ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="square-stack-chart" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
          if (item.type === Const.STACKCHART) {
            const idKey = item.type + moment().unix() + index;
            return (
              <div key={idKey} className="legend-item legend-stack-bar">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      '#' + idKey + ':after {',
                      'background-color: ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="square-stack-chart" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
          if (item.type === Const.CIRCLEMARKERLINE) {
            const idKey = item.type + moment().unix() + index;
            const strIdKey = '#' + idKey;
            return (
              <div key={idKey} className="legend-item">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      strIdKey + ':after {',
                      'background: ' + color,
                      '}' + strIdKey + ':before {',
                      'border-bottom: 1.2px solid ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="span-cirle" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
          if (item.type === Const.TRIANGLEMARKERLINE) {
            const idKey = item.type + moment().unix() + index;
            const strIdKey = '#' + idKey;
            return (
              <div key={idKey} className="legend-item">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      strIdKey + ':after {',
                      'border-bottom: 6px solid ' + color,
                      '}' + strIdKey + ':before {',
                      'border-bottom: 1.2px solid ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="span-triangle" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
          if (item.type === Const.Line) {
            const idKey = item.type + moment().unix() + index;
            const strIdKey = '#' + idKey;
            return (
              <div key={idKey} className="legend-item">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      strIdKey + ':after {',
                      'border-bottom: 1.2px solid ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="span-line" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
          if (item.type === Const.SQUAREMARKERLINE) {
            const idKey = item.type + moment().unix() + index;
            const strIdKey = '#' + idKey;
            return (
              <div key={idKey} className="legend-item">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      strIdKey + ':after {',
                      'background: ' + color,
                      '}' + strIdKey + ':before {',
                      'border-bottom: 1.2px solid ' + color,
                      '}',
                    ].join('\n'),
                  }}
                />
                <span className="span-square" id={idKey}>
                  {strLegendName}
                </span>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
ChartFooter.propTypes = {
  listLegend: PropTypes.array.isRequired,
};

ChartFooter.defaultProps = {
  listLegend: [],
};
const mapStateToProps = state => ({
  theme: state.theme,
  i18n: state.i18n,
});

export default connect(mapStateToProps)(ChartFooter);
