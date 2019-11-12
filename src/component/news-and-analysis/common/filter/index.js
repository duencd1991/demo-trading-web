import React from 'react';
//TODO import './index.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import PopupCalendar from '../popup-calendar';
import { REDUCER_NAME, toggleFavoriteFilter } from '../../reducer';
import Const from '../../Const';

class Filter extends React.Component {
  onClickFavorite = () => {
    const { toggleFavoriteFilter, currentChildTab, currentTab } = this.props;
    const storeName =
      currentTab !== 4
        ? Const.TAB_MAPPING[currentTab]
        : Const.TAB_MAPPING[currentTab][currentChildTab];
    toggleFavoriteFilter(storeName);
  };

  render() {
    return (
      <div
        className="d-flex"
        style={{
          position: 'relative',
          justifyContent: ' flex-end',
        }}
      >
        <div className="d-flex">
          <PopupCalendar isDateSelected={null} />
          <a
            href="#"
            className="btn btn-cus-nomal bg-b-color-3 ml-5"
            onClick={this.onClickFavorite}
          >
            FAVORITE
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  currentTab: state[REDUCER_NAME].currentTab,
  currentChildTab: state[REDUCER_NAME].currentChildTab,
});

const mapDispatchToProps = {
  toggleFavoriteFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
