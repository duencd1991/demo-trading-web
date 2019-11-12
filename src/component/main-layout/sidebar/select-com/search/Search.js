import React from 'react';
import SearchBox from './SearchBox';
import SearchList from './SearchList';
import { searchTextInListByListKey } from './../../../../helpers/Common';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);
    const listData = this.getListData();
    this.state = {
      listSearch: listData,
      listData,
    };
  }

  getListData = () => {
    const listComponentTitle = I18n.t('common.listComponent');
    return Object.values(listComponentTitle);
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.i18n !== this.props.i18n) {
      const listData = this.getListData();
      this.setState({ listData, listSearch: listData });
    }
  }

  handleChangeInput = e => {
    const { result: listSearch } = searchTextInListByListKey(
      this.state.listData,
      e.target.value,
    );
    this.setState({ listSearch });
  };

  render() {
    const { listSearch } = this.state;

    return (
      <>
        <SearchBox handleChangeInput={this.handleChangeInput} {...this.props} />
        <SearchList listSearch={listSearch} {...this.props} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(Search);
