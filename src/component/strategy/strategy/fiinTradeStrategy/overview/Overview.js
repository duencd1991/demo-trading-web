import React from 'react';
import { connect } from 'react-redux';
import OverviewTable from './OverviewTable';
import { REDUCER_NAME, fetchOverview } from '../reducer';
import Responsive from '../../../../common/responsive/Responsive';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOverview();
  }
  render() {
    const { component = {}, width } = this.props;
    console.log(component, 'ttttttttttttttt');
    return (
      <div className="fiinTradeStrategy overview">
        <Responsive
          component={{
            ...component,
            width: Math.max(component.width, 400),
          }}
          margin={10}
          offsetWidth={40}
          XS_SIZE={500}
          numColumnLgSize={2}
          numColumnMdSize={2}
        >
          {() => (
            <OverviewTable
              titleHeaderTable="TOP 5 OF LEADERS"
              colorLeft="#9983d8"
              colorRight="#9983d8"
            />
          )}
          {() => (
            <OverviewTable
              titleHeaderTable="TOP 5 OF VALUE"
              colorLeft="#f5761d"
              colorRight="#f5761d"
            />
          )}
          {() => (
            <OverviewTable
              titleHeaderTable="TOP 5 OF GROWTH"
              colorLeft="#f4485e"
              colorRight="#f4485e"
            />
          )}
          {() => (
            <OverviewTable
              titleHeaderTable="TOP 5 OF MOMENTUM"
              colorLeft="#2965cc"
              colorRight="#2965cc"
            />
          )}
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  component: state[REDUCER_NAME].component,
});

const mapDispatchToProps = {
  fetchOverview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);
