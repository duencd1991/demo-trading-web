import React from 'react';
import Const from './Const';
import enhanceWithClickOutside from 'react-click-outside';
import { changeTrendIndex } from '../reducer';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

const trends = [
  Const.index.AVERAGE_PRICE_DAILY,
  Const.index.AVERAGE_PRICE_5SESSION_WEEKLY,
  Const.index.AVERAGE_PRICE_5SESSION_MONTHLY,
  Const.index.AVERAGE_PRICE_5SESSION_QUARTERLY,
];

class HeadTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTrend: false,
      trend: Const.index.AVERAGE_PRICE_DAILY,
    };
  }

  toggleTrend = () => {
    this.setState({ ...this.state, isShowTrend: !this.state.isShowTrend });
  };

  changeTrend = typeTrend => {
    const { isShowTrend } = this.state;
    this.setState({
      isShowTrend: !isShowTrend,
      trend: typeTrend,
    });
    this.props.changeTrend(typeTrend);
  };

  handleClickOutside = () => {
    if (this.state.isShowTrend) {
      this.toggleTrend();
    }
  };

  render() {
    const { trend } = this.state;
    const { children } = this.props;
    const title = I18n.t(children);

    const className = this.state.isShowTrend
      ? 'dropdown-menu dropdown-menu-right drop-th drop-mecus show'
      : 'dropdown-menu dropdown-menu-right drop-th drop-mecus';

    return (
      <div>
        {title}
        <div className="dropdown drop-sort">
          <button
            className="dropdown-toggle"
            type="button"
            aria-haspopup="true"
            onClick={this.toggleTrend}
            aria-expanded="false"
          >
            <i className="icon-caret ml-2" />
          </button>
          <div
            className={className}
            aria-labelledby="dropdownMenuButton"
            style={{
              position: 'absolute',
              willChange: 'transform',
              top: '0px',
              left: '0px',
              transform: 'translate3d(-67px, 16px, 0px)',
            }}
          >
            {trends.map((trendName, index) => (
              <a
                key={index}
                className={`dropdown-item ${
                  trendName === trend ? 'trend-active' : ''
                }`}
                href="#"
                onClick={() => this.changeTrend(trendName)}
              >
                {I18n.t(`watchListSummary.${trendName}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

const mapDispatchToProps = dispatch => {
  return {
    changeTrend: typeTrend => dispatch(changeTrendIndex(typeTrend)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(enhanceWithClickOutside(HeadTrend));
