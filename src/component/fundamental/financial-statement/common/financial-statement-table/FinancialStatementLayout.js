import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../../common/loading/Loading';
import SizeTracker from '../../../../common/size-tracker/SizeTracker';
import FinancialStatementTable from '../financial-statement-table/FinancialStatementTable';
import { NUMBER_FLEXIBLE } from '../../Const';

class FinancialStatementLayout extends PureComponent {
  constructor(props) {
    super(props);
    const { fields } = this.props;
    this.state = {
      startIndex: Math.max(fields.length - NUMBER_FLEXIBLE, 0),
    };
  }

  componentDidMount() {
    const { fetchData, organCode, componentId } = this.props;
    fetchData(
      {
        OrganCode: organCode,
      },
      componentId,
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { organCode, fetchData, componentId } = this.props;
    if (organCode !== prevProps.organCode) {
      fetchData(
        {
          OrganCode: organCode,
        },
        componentId,
      );
    }
  }

  onStartIndexChange = startIndex => {
    this.setState({
      startIndex,
    });
  };

  render() {
    const { startIndex } = this.state;
    const {
      isLoading,
      ids,
      fields,
      timeKey,
      dataByIds,
      children,
      getDataFromRedux,
    } = this.props;

    return (
      <div className="position-relative d-flex flex-column flex-fill">
        <div
          className={`d-flex flex-column flex-fill ${
            isLoading ? 'fs-blur' : ''
          }`}
        >
          {children && typeof children === 'function' && children(startIndex)}
          <SizeTracker className="flex-fill financial-statement-table">
            {(width, height) => (
              <FinancialStatementTable
                ids={ids}
                height={height}
                getDataFromRedux={getDataFromRedux}
                fields={fields}
                timeKey={timeKey}
                dataByIds={dataByIds}
                onStartIndexChange={this.onStartIndexChange}
              />
            )}
          </SizeTracker>
        </div>
        {isLoading && <Loading />}
      </div>
    );
  }
}

FinancialStatementLayout.propTypes = {
  fetchData: PropTypes.func.isRequired,
  ids: PropTypes.array.isRequired,
  organCode: PropTypes.string,
  timeKey: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  i18nPrefix: PropTypes.string,
  getDataFromRedux: PropTypes.func.isRequired,
  componentId: PropTypes.number.isRequired,
};

FinancialStatementLayout.defaultProps = {};

export default FinancialStatementLayout;
