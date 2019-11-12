import React from 'react';
import { connect } from 'react-redux';
import { I18n } from "react-redux-i18n";
import _ from 'lodash';
import { REDUCER_NAME, changeDateRange } from './../reducer';
import PriceDataDate from './PriceDataDate';
import moment from 'moment';


class TimeFrame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      datePicker: {
        from: props.listMultiComponent[props.id].dateRangeOption.FromDate,
        to: props.listMultiComponent[props.id].dateRangeOption.ToDate,
      }
    }

  }

  handleDateChange = (itemDate) => {
    const { id , changeDateRange} = this.props;
    const clone = {
      ...this.state.datePicker,
      from : itemDate.startDate,
      to : itemDate.endDate ? itemDate.endDate : moment(new Date()).format('MM/DD/YYYY') ,
    }
    this.setState({ datePicker: clone })
    changeDateRange(clone, id)
  }

  render() {
    const { id , listMultiComponent} = this.props;
    const dateRangeOption = listMultiComponent[id].dateRangeOption;

    let nameFrom = I18n.t('priceData.lstTitleDate.from');

    return (
      <>
        <PriceDataDate
          nameFrom={nameFrom}
          handleDateChange={this.handleDateChange}
          startDate={dateRangeOption.FromDate}
          endDate={dateRangeOption.ToDate}
          id={id}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listMultiComponent: state[REDUCER_NAME].listMultiComponent,
    i18n: state.i18n,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDateRange:(datePicker, id) => dispatch(changeDateRange(datePicker, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeFrame)
