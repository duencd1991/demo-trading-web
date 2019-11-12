import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  formatChange,
  formatPercent,
  formatTextFloat,
} from '../../../helpers/Text';
import { MIN_FONT_SIZE } from './Const';
import TickerTreeMap from './TickerTreeMap';

class Sector extends PureComponent {
  getTickerTreeMapData = () => {
    const {
      data: { tickers, name, icbCode, topTen },
    } = this.props;

    return {
      name,
      icbCode,
      topTen,
      children: tickers,
    };
  };

  getSectorName = () => {
    const { data } = this.props;

    return data.name.toUpperCase();
  };

  render() {
    const {
      fontSize,
      width,
      height,
      data,
      toggleHideTicker,
      isHideTicker,
      sectorClassName,
    } = this.props;
    const name = this.getSectorName();
    return (
      <div className="sector-wrapper" onClick={toggleHideTicker}>
        {!isHideTicker ? (
          <TickerTreeMap
            sectorClassName={sectorClassName}
            sectorName={name}
            parentRate={data.rate}
            title={data.name}
            width={width}
            height={height}
            value={data.rate}
            data={this.getTickerTreeMapData()}
          />
        ) : (
          <div
            style={{
              fontSize: `${fontSize}px`,
            }}
            className="sector-name"
          >
            {data.rate && fontSize > MIN_FONT_SIZE && (
              <>
                <div className="text-center">{name}</div>
                <div className="text-center rate">
                  {formatChange(formatTextFloat(formatPercent(data.rate)))} %
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

Sector.propTypes = {
  fontSize: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  isHideTicker: PropTypes.bool.isRequired,
  toggleHideTicker: PropTypes.func.isRequired,
  sectorClassName: PropTypes.string,
  locale: PropTypes.string.isRequired,
};

Sector.defaultProps = {
  sectorClassName: '',
};

const mapStateToProps = state => ({
  locale: state.i18n.locale,
});

export default connect(mapStateToProps)(Sector);
