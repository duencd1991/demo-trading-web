import React from 'react';
import { connect } from 'react-redux';
import SizeTracker from '../../../../common/size-tracker/SizeTracker';
import { REDUCER_NAME, fetchValue } from '../reducer';
import ValueTable from './ValueTable';
import Chart from './Chart';
import Responsive from '../../../../common/responsive/Responsive';
import './Value.scss';
import Header from '../../common/Header';
import ValueTableRanking from './ValueTableRanking';
import ScrollComponent from './../../../../common/ScrollComponent';
import ConstCommon from '../../common/Const';

class Value extends React.Component {
  componentDidMount() {
    this.props.fetchValue();
  }

  render() {
    const { component = {} } = this.props;
    return (
      <div className="fiinTradeStrategy value flex-fill d-flex flex-column">
        <Header
          firstStrName={'strategy.visNameHeader'}
          secondStrName={'strategy.highNameHeader'}
          title={'strategy.vis'}
          isShowCheckbox={true}
          color={ConstCommon.COLORVALUE}
        />
        <SizeTracker className="flex-fill">
          {(width, height) => (
            <div style={{ height }} className="position-relative">
              <ScrollComponent>
                <Responsive
                  appendClass="responsive-wrapper-strategy"
                  component={{
                    ...component,
                    width: Math.max(component.width, 400),
                  }}
                  margin={10}
                  offsetWidth={41}
                  XS_SIZE={600}
                  numColumnLgSize={2}
                  numColumnMdSize={2}
                  ratioWidthItem={[6, 4]}
                >
                  {widthC => <Chart width={widthC} />}
                  {heightC => <ValueTable height={320} />}
                </Responsive>
                <ValueTableRanking />
                <div style={{ height: 15 }} />
              </ScrollComponent>
            </div>
          )}
        </SizeTracker>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  component: state[REDUCER_NAME].component,
});

const mapDispatchToProps = {
  fetchValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Value);
