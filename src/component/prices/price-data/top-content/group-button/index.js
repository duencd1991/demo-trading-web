import React from 'react';
import { REDUCER_NAME } from './../../reducer';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import BuySellButton from './../../../common/group-button'

class indexSumary extends React.Component {


  render() {
    const { id, listMultiComponent, listDataSearch } = this.props;
    const code = listMultiComponent[id].currentSearch.code;
    const inforTicker = listDataSearch.find(item => item.displayCode === code)

    //let groupButton = '';

    if (inforTicker && !inforTicker.isTicker) {
      return (
      <div className='group-button d-flex align-items-center justify-content-between flex-row mr-3'></div>
      )
    }
    return (
			<BuySellButton />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    i18n: state.i18n,
    listDataSearch: state[REDUCER_NAME].listDataSearch,

  }
};

export default connect(mapStateToProps)(indexSumary);
