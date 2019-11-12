import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import onClickOutside from 'react-click-outside';
import './template-content.scss';
import Tab from '../../../common/tab';
import TabContent from './TabContent';

const TABS = {
  all: 1,
  current: 2,
};

class TemplateContent extends PureComponent {
  state = {
    currentTab: TABS.current,
    search: '',
  };
  inputRef = React.createRef();

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);
    this.inputRef.current.focus();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp = e => {
    e.preventDefault();
    if (e.keyCode === 27) {
      const { changePopUpStatus } = this.props;
      changePopUpStatus(false);
      window.removeEventListener('keyup', this.onKeyUp);
    }
  };

  changeTab = tab => {
    this.setState({
      currentTab: tab,
    });
  };

  handleClickOutside = () => {
    const { changePopUpStatus } = this.props;
    changePopUpStatus(false);
  };

  onInputChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { currentTab, search } = this.state;
    const { changePopUpStatus } = this.props;
    return (
      <div className="technical-template">
        <div className="top-nav">
          <Tab
            currentTab={currentTab}
            listTab="charting.templateTab"
            changeTab={this.changeTab}
          />
          <div className="tab-content">
            <div className="search-filter">
              <input
                value={search}
                ref={this.inputRef}
                type="search"
                onChange={this.onInputChange}
                placeholder={I18n.t('charting.search')}
              />
              <button type="button">
                <i className="icon-search" />
              </button>
            </div>
            <TabContent search={search} changePopUpStatus={changePopUpStatus} />
          </div>
        </div>
      </div>
    );
  }
}

TemplateContent.propTypes = {
  changePopUpStatus: PropTypes.func.isRequired,
};

export default onClickOutside(TemplateContent);
