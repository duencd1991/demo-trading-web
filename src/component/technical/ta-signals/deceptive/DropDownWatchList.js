import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { DropDown } from '../../../common/dropdown';
import { changeWatchList, REDUCER_NAME } from './reducer';

class DropDownWatchList extends React.Component {
  onChange = select => {
    const { changeWatchList } = this.props;
    changeWatchList(select);
  };

  render() {
    const {
      listWatchListId,
      listWatchListByWatchListId,
      watchListId,
    } = this.props;
    return (
      <div className="line-drop">
        <DropDown
          listKey={listWatchListId}
          listDataByKey={listWatchListByWatchListId}
          currentKey={watchListId}
          keyTitle={'text'}
          change={this.onChange}
          isEditable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listWatchListId: state[REDUCER_NAME].listWatchListId,
    listWatchListByWatchListId: state[REDUCER_NAME].listWatchListByWatchListId,
    watchListId: state[REDUCER_NAME].watchListId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWatchList: watchListId => dispatch(changeWatchList(watchListId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropDownWatchList);
