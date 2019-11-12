import React from 'react';
//TODO import './index.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { debounce } from 'lodash';
import { setAPIParams, REDUCER_NAME } from '../../reducer';

const KEY_ENTER = 13;

const initialState = {
  value: '',
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.updateInputValue = debounce(this.updateInputValue, 1500);
    this.state = initialState;
  }

  componentWillReceiveProps = nextProps => {
    const { currentTab, currentChildTab } = this.props;
    if (currentTab !== nextProps.currentTab) {
      this.setState(initialState);
    }
  };

  updateInputValue = KeyWord => {
    const query = KeyWord || null;
    this.handleSearch(query);
  };

  handleOnChange = e => {
    this.updateInputValue(e.target.value);
    this.setState({ value: e.target.value });
  };

  onKeyDown = e => {
    if (e.keyCode === KEY_ENTER) {
      this.updateInputValue.cancel();
      const KeyWord = e.target.value;
      const query = KeyWord || null;
      this.handleSearch(query);
    }
  };

  handleSearch = query => {
    const { setAPIParams, currentTab, currentChildTab, apiParams } = this.props;
    if (apiParams.KeyWord === null || apiParams.KeyWord !== query) {
      // if change keyword reset Page to 1
      return setAPIParams(
        { parentTab: currentTab, childTab: currentChildTab },
        { KeyWord: query, Page: 1 },
      );
    }

    setAPIParams(
      { parentTab: currentTab, childTab: currentChildTab },
      { KeyWord: query },
    );
  };

  render() {
    const { value } = this.state;
    return (
      <div className="na-search-box-wrapper">
        <input
          type="search"
          placeholder="Search"
          value={value}
          onChange={this.handleOnChange}
          onKeyDown={this.onKeyDown}
        />
        <button type="button" style={{ cursor: 'pointer' }}>
          <i className="icon-search" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    currentTab: state[REDUCER_NAME].currentTab,
    currentChildTab: state[REDUCER_NAME].currentChildTab,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAPIParams: (tabNumber, apiParams) =>
      dispatch(setAPIParams(tabNumber, apiParams)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
