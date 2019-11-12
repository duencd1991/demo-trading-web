import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertSystem from './system/index';
import AlertPersonal from './personal/index';
import { TABS } from './Const';

const tabMap = {
  [TABS.ALERT_SYSTEM]: AlertSystem,
  [TABS.ALERT_PERSONAL]: AlertPersonal,
};

class TabContent extends PureComponent {
  constructor(props) {
    super(props);
    this.toolAlertsRef = React.createRef();
  }

  render() {
    const { currentTab } = this.props;
    const ContentComponent = tabMap[currentTab];
    return (
      <div className="d-flex flex-column flex-fill" ref={this.toolAlertsRef}>
        <ContentComponent key={currentTab} parentRef={this.toolAlertsRef} />
      </div>
    );
  }
}

TabContent.propTypes = {
  currentTab: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(TabContent);
