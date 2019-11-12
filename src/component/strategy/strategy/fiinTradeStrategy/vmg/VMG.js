import React from 'react';
import { connect } from 'react-redux';
import SizeTracker from '../../../../common/size-tracker/SizeTracker';
import { REDUCER_NAME, fetchValue } from '../reducer';
import VMGTable from './VMGTable';
import Chart from './Chart';
import Responsive from '../../../../common/responsive/Responsive';
import './VMG.scss';
import Header from '../../common/Header';
import VMGTableRanking from './VMGTableRanking';
import ScrollComponent from './../../../../common/ScrollComponent';
import ConstHeader from '../../common/Const';

class VMG extends React.Component {
  componentDidMount() {
    this.props.fetchValue();
  }

  render() {
    const { component = {} } = this.props;
    return (
      <div className="fiinTradeStrategy value flex-fill d-flex flex-column">
        <Header
          firstStrName={'strategy.VMGNameHeader'}
          secondStrName={'strategy.highNameHeader'}
          title={'strategy.vmg'}
          isShowCheckbox={true}
          color={ConstHeader.COLORVMG}
        />
        <SizeTracker className="flex-fill">
          {(width, height) => (
            <div style={{ height }} className="position-relative">
              <ScrollComponent>
                <Responsive
                  appendClass="responsive-wrapper-vmg"
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
                  {heightC => <VMGTable height={320} />}
                </Responsive>
                <VMGTableRanking />
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
)(VMG);
