import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import SizeTracker from '../../common/size-tracker/SizeTracker';
import Tab from '../../common/tab-timer';
import { connect } from 'react-redux';
import { REDUCER_NAME } from './reducer';
import TreeMap from './treemap/TreeMap';

class TabContent extends PureComponent {
  treeMapRef = React.createRef();

  formatData = () => {
    const { sectors } = this.props;

    return {
      name: '',
      children: sectors,
    };
  };

  renderTreeMap = () => {
    const { isLoading, sectors } = this.props;

    if (!isLoading && !sectors.length) {
      return (
        <div className="heat-map-no-data">
          <Translate value="heatmap.noData" />
        </div>
      );
    }

    return (
      <SizeTracker className="flex-fill heat-map-tree-map">
        {(width, height) => (
          <TreeMap
            ref={this.treeMapRef}
            isLoading={isLoading}
            data={this.formatData()}
            width={width}
            height={height}
          />
        )}
      </SizeTracker>
    );
  };

  render() {
    const { currentCriteria, changeCriteria } = this.props;

    return (
      <div className="d-flex flex-column flex-fill">
        <div className="w-100">
          <div className="list-filter top-nav">
            <Tab
              currentTab={currentCriteria}
              listTab="heatmap.typeTab"
              changeTab={changeCriteria}
            />
          </div>
        </div>
        {this.renderTreeMap()}
      </div>
    );
  }
}

TabContent.propTypes = {
  currentCriteria: PropTypes.number.isRequired,
  changeCriteria: PropTypes.func.isRequired,
  sectors: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  sectors: state[REDUCER_NAME].sectors,
  isLoading: state[REDUCER_NAME].isLoading,
});

export default connect(mapStateToProps)(TabContent);
