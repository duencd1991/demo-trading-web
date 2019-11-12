import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import ChartingPreRender from '../../common/ChartingPreRender';
import ConstCommon from '../../common/Const';
import withPreRender from '../../common/withPreRender';
import TradingView from './trading-view/TradingView';
import './index.scss';

class Charting extends PureComponent {
  render() {
    const { locale, id, glEventHub, glContainer } = this.props;
    return (
      <div className="p-10 h-100 technical-charting">
        <ChartingPreRender>
          <TradingView
            key={locale}
            glContainer={glContainer}
            glEventHub={glEventHub}
            id={id}
          />
        </ChartingPreRender>
      </div>
    );
  }
}

Charting.propTypes = {
  locale: PropTypes.string.isRequired,
  glContainer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  locale: state.i18n.locale,
});
export default compose(
  connect(mapStateToProps),
  withPreRender(ConstCommon.listComponent.Charting),
)(Charting);
