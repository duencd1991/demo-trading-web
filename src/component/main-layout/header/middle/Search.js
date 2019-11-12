import React, {Component} from "react";
import {I18n} from 'react-redux-i18n';
import {connect} from 'react-redux';

class Search extends Component{

  render() {
    return (
      <div className="search-box-top float-left">
        <div className="search-tool-box">
          <input type="search" placeholder={I18n.t('common.searchAdd.search')} />
          <button type="button"><i className="icon-search"/></button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  }
};

export default connect(mapStateToProps)(Search);
