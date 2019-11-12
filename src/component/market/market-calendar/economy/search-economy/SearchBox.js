import React from 'react';
import _, { debounce } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import {
  REDUCER_NAME,
  intercalFetchEconomy,
  setParamsEco,
} from '../../reducer';
import Const from '../Const';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    // this.updateInputValue = debounce(this.updateInputValue, 1000)
    this.updateInputValue = _.throttle(this.updateInputValue, 200);
  }

  updateInputValue = KeyWord => {
    const params = {
      keyWord: KeyWord.trim(),
      weekOfYear: this.props.weekOfYear,
      year: this.props.year,
      page: Const.page,
      pageSize: Const.pageSize,
    };
    this.props.setParamsEco(params);
    this.props.intercalFetchEconomy(params);
  };

  handleOnChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
    this.updateInputValue(value);
  };

  handleSearchBox = () => {
    const params = {
      keyWord: this.state.inputValue,
      weekOfYear: this.props.weekOfYear,
      year: this.props.year,
      page: Const.page,
      pageSize: Const.pageSize,
    };
    this.props.setParamsEco(params);
    this.props.intercalFetchEconomy(params);
  };

  render() {
    return (
      <div className="item-filter">
        <div className="search-filter">
          <input
            type="search"
            placeholder={I18n.t('common.searchAdd.search')}
            value={this.state.inputValue}
            onChange={e => {
              this.handleOnChange(e);
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.handleSearchBox();
              }
            }}
          />
          <button
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={e => {
              this.handleSearchBox();
            }}
          >
            <i className="icon-search" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  weekOfYear: state[REDUCER_NAME].weekOfYear,
  year: state[REDUCER_NAME].year,
  keyWord: state[REDUCER_NAME].keyWord,
});

const mapDispatchToProps = dispatch => {
  return {
    intercalFetchEconomy: params => dispatch(intercalFetchEconomy(params)),
    setParamsEco: params => dispatch(setParamsEco(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
