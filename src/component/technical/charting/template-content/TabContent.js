import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { compose } from 'redux';
import { withWidget } from '../context';
import {
  changeCurrentTemplateId,
  deleteTemplateRequest,
  REDUCER_NAME,
} from '../reducer';
import CurrentTemplate from './CurrentTemplate';
import ListTemplate from './ListTemplate';

class TabContent extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onItemClick = index => {
    this.setState({
      activeIndex: index,
    });
  };

  onLoadTemplate = (config, id) => {
    const { widget, changePopUpStatus, changeCurrentTemplateId } = this.props;
    if (!config) {
      return;
    }
    const state = JSON.parse(config);
    if (state.theme) {
      widget.changeTheme(state.theme);
    }
    widget.load(state);
    changePopUpStatus(false);
    changeCurrentTemplateId(id);
  };

  onDeleteTemplate = id => {
    const { deleteTemplateRequest, changePopUpStatus } = this.props;
    deleteTemplateRequest({ layoutId: id });
    changePopUpStatus(false);
  };

  getItems = () => {
    const { items, search } = this.props;

    return items.filter(item => item.name.includes(search));
  };

  render() {
    const { activeIndex } = this.state;
    const { items } = this.props;
    const currentItem = items[activeIndex];
    const listTemplate = this.getItems();
    if (!listTemplate.length) {
      return (
        <div className="no-template">
          <Translate value="charting.noTemplate" />
        </div>
      );
    }

    return (
      <div className="d-flex">
        <ListTemplate onItemClick={this.onItemClick} items={listTemplate} />
        {currentItem && (
          <CurrentTemplate
            onDeleteTemplate={this.onDeleteTemplate}
            onLoadTemplate={this.onLoadTemplate}
            item={currentItem}
          />
        )}
      </div>
    );
  }
}

TabContent.propTypes = {
  items: PropTypes.array,
  widget: PropTypes.object.isRequired,
  changePopUpStatus: PropTypes.func.isRequired,
  changeCurrentTemplateId: PropTypes.func.isRequired,
  deleteTemplateRequest: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

TabContent.defaultProps = {
  items: [],
};

const mapStateToProps = state => ({
  items: state[REDUCER_NAME].templates,
});

const mapDispatchToProps = {
  deleteTemplateRequest,
  changeCurrentTemplateId,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withWidget,
)(TabContent);
