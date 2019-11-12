import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DropDown } from '../../../common/dropdown';
import Const from '../Const';
import {
  changeWatchList,
  REDUCER_NAME,
  changeSector,
  fetchMyWatchList,
} from '../reducer';

class Filter extends PureComponent {
  componentDidMount() {
    const { fetchMyWatchList } = this.props;
    fetchMyWatchList();
  }

  onChangeWatchlist = select => {
    const { changeWatchList } = this.props;
    changeWatchList(select);
  };

  changeSector = select => {
    const { changeSector } = this.props;
    changeSector(select);
  };

  render() {
    const {
      listWatchListId,
      listWatchListByWatchListId,
      watchListId,
      listIndustryByKey,
      listIndustry,
      sectorId,
      comGroupCode,
      icbCode,
    } = this.props;
    return (
      <div className="float-left screener-filter">
        <div className="list-filter w-120px mr-10">
          <div className="line-drop">
            <DropDown
              listKey={listWatchListId}
              listDataByKey={listWatchListByWatchListId}
              keyTitle={'text'}
              currentKey={watchListId || comGroupCode}
              change={this.onChangeWatchlist}
              isI18n={true}
            />
          </div>
          <div className="line-drop ml-20">
            <DropDown
              listKey={listIndustry}
              listDataByKey={listIndustryByKey}
              keyTitle={'text'}
              currentKey={sectorId || icbCode}
              change={this.changeSector}
              isI18n={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listWatchListId: state[REDUCER_NAME].listWatchListId,
    listWatchListByWatchListId: state[REDUCER_NAME].listWatchListByWatchListId,
    watchListId: state[REDUCER_NAME].comGroupCode,
    listIndustry: state[REDUCER_NAME].listIndustry,
    listIndustryByKey: state[REDUCER_NAME].listIndustryByKey,
    sectorId: state[REDUCER_NAME].icbCode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWatchList: watchListId => dispatch(changeWatchList(watchListId)),
    changeSector: sectorId => dispatch(changeSector(sectorId)),
    fetchMyWatchList: () => dispatch(fetchMyWatchList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
