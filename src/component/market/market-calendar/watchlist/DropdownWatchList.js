import React from 'react';
import { DropDown } from "../../../common/dropdown";
import { connect } from 'react-redux';
import { changeWatchListDropDown, REDUCER_NAME, fetchListWatchListDropDown } from "../reducer";

class DropDownWatchList extends React.Component {

  componentDidMount() {
    this.props.fetchListWatchListDropDown();
  }

  render() {
    const {
      lstTickerWatchListDrop, lstTickerWatchListDropByTicker, changeWatchListDropDown, watchListId } = this.props;
    const lstConvert = Object.keys(lstTickerWatchListDropByTicker).reduce((result, key) => {
      return {
        ...result,
        [key]: {
          key: lstTickerWatchListDropByTicker[key].watchListId,
          name: lstTickerWatchListDropByTicker[key].text,
          typeCode: lstTickerWatchListDropByTicker[key].typeCode
        }
      }
    }, {});
    return (
      <DropDown
        keyTitle="name"
        listKey={[...lstTickerWatchListDrop]}
        listDataByKey={lstConvert}
        currentKey={watchListId + ""}
        change={(value) => {
          changeWatchListDropDown(lstConvert[value].typeCode, Number(value))
        }}
        isEditable={false}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    watchlistType: state[REDUCER_NAME].watchlistType,
    watchListId: state[REDUCER_NAME].watchListId,
    lstTickerWatchListDrop: state[REDUCER_NAME].lstTickerWatchListDrop,
    lstTickerWatchListDropByTicker: state[REDUCER_NAME].lstTickerWatchListDropByTicker,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListWatchListDropDown: () => dispatch(fetchListWatchListDropDown()),
    changeWatchListDropDown: (watchlistType, watchListId) => dispatch(changeWatchListDropDown(watchlistType, watchListId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownWatchList);


