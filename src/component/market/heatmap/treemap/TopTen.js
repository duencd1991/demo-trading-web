import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { CRITERIAS, CurrentCriteriaContext } from '../Const';
import TopTenItem from './TopTenItem';

class TopTen extends PureComponent {
  constructor(props) {
    super(props);
    this.hidePopup = debounce(this.onMouseEnter, 10);
  }

  onMouseEnter = () => {
    const { showList } = this.props;
    showList(false);
  };

  getThirdTitle = () => {
    const currentCriteria = this.context;
    const mapI18nKey = {
      [CRITERIAS.MARKET_CAP]: 'marketCap',
      [CRITERIAS.VOLUME]: 'volume',
      [CRITERIAS.VALUE]: 'value',
      [CRITERIAS.BUY_VOL]: 'frBuyVol',
      [CRITERIAS.SELL_VOL]: 'frSellVol',
    };

    return I18n.t(`heatmap.${mapI18nKey[currentCriteria]}`);
  };

  render() {
    const { style, innerRef, topTen, hoverCode, sectorName } = this.props;

    return (
      <ul
        onMouseOver={this.hidePopup}
        ref={innerRef}
        style={style}
        className="list-group list-ticker"
      >
        <li className="list-group-item top-ten-title">{sectorName}</li>
        <li>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{I18n.t('heatmap.ticker')}</th>
                <th className="text-right" scope="col">
                  {I18n.t('heatmap.price')}
                </th>
                <th className="text-right" scope="col">
                  {I18n.t('heatmap.percentChange')}
                </th>
                <th className="text-right" scope="col">
                  {this.getThirdTitle()}
                </th>
              </tr>
            </thead>
            <tbody>
              {topTen.map((item, index) => (
                <TopTenItem
                  organCode={item.organCode}
                  key={index}
                  hoverCode={hoverCode}
                />
              ))}
            </tbody>
          </table>
        </li>
      </ul>
    );
  }
}

TopTen.propTypes = {
  style: PropTypes.object,
  hoverCode: PropTypes.string,
  showList: PropTypes.func,
  topTen: PropTypes.array,
  sectorName: PropTypes.string,
};

TopTen.defaultProps = {
  style: {},
  hoverCode: '',
  topTen: [],
  showList: () => {},
  sectorName: '',
};

TopTen.contextType = CurrentCriteriaContext;

export default React.forwardRef((props, ref) => (
  <TopTen {...props} innerRef={ref} />
));
