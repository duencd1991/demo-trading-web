import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChanelConfig } from '../../../configs/GlobalConfig';
import { checkIsBank } from '../../helpers/Common';
import { fetchListTicker, setUpData, subscribeRealtimePrice } from './reducer';
import { connect } from 'react-redux';
import './FASnapshot.scss';
import withPreRender from './../../common/withPreRender';
import TemplatePDF from './common/TemplatePDF';
import ScrollComponent from '../../common/ScrollComponent';
import { Provider } from './../../common/ComponentIdContext';
import Info from './Info';
import Chart from './Chart';
import { compose } from 'redux';
import { withComponentId } from './../../common/ComponentIdContext';
import FAHead from './FAHead';
import withRealtime from './../../common/withRealtime';
import ConstCommon from './../../common/Const';

class FASnapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
    const { setUpData, id } = props;
    setUpData(id, this.getCurrentSearch());
  }

  componentDidMount() {
    const { fetchListTicker } = this.props;

    fetchListTicker();
  }

  getCurrentSearch = () => {
    const { dragCode } = this.props;
    if (dragCode) {
      return {
        code: dragCode.organCode,
        codeName: dragCode.organShortName,
        displayCode: dragCode.ticker,
        exchange: dragCode.exchange,
        isBank: checkIsBank(dragCode.comTypeCode),
      };
    }

    return null;
  };

  onSizeInfo = size => {
    this.setState({ width: size.width });
  };

  render() {
    const { id, dragCode } = this.props;
    const { width } = this.state;
    const idFormExport = 'fa-snapshot-export' + id;

    return (
      <Provider value={id}>
        <div className="top-nav snapshot-wrapper h-100">
          <ScrollComponent>
            <div className="pr-20 pl-20 pt-8 pb-10 w-100" id={idFormExport}>
              <FAHead id={id} dragCode={dragCode} />
              <div className="fa-body-content">
                <Info width={width} onSize={this.onSizeInfo} />
                <Chart width={width} />
              </div>
              <TemplatePDF />
            </div>
          </ScrollComponent>
        </div>
      </Provider>
    );
  }
}

FASnapshot.propTypes = {
  fetchListTicker: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListTicker,
  setUpData,
  subscribeRealtimePrice,
};

export default compose(
  withPreRender(ConstCommon.listComponent.FASnapshot),
  withComponentId,
  connect(
    null,
    mapDispatchToProps,
  ),
  withRealtime(ChanelConfig.TickChanel, 'subscribeRealtimePrice'),
)(FASnapshot);
