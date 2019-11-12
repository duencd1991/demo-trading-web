import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_NAME, changeTimeRange } from './../reducer';
import Const from '../Const';
import { I18n } from 'react-redux-i18n';

class FilterTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { changeTimeRange, id, listMultiComponent } = this.props;
    const timeRangeFilter = listMultiComponent[id].timeRangeFilter;

    let listTimeRange = Const.listTimeRange;
    let listTimeRangeByKey = I18n.t('priceData.listTimeRangeByKey');

    return (
      <div>
        <div className="btn-groupcus-line">
          {listTimeRange.map(key => {
            const className =
              key === timeRangeFilter
                ? 'btn btn-cus-nomal bg-b-color-3 active'
                : 'btn btn-cus-nomal bg-b-color-3';
            return (
              <a
                href="#"
                className={className}
                key={key}
                onClick={() => {
                  changeTimeRange(key, id);
                }}
              >
                {listTimeRangeByKey[key]}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    i18n: state.i18n,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeTimeRange: (key, id) => dispatch(changeTimeRange(key, id)),
//   }
// }

const mapDispatchToProps = {
  changeTimeRange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterTime);
