import React from 'react';
import { I18n } from 'react-redux-i18n';
import Toggle from './../../../../common/Toggle';
import { changeColumnComparingCheckup, REDUCER_NAME } from '../../reducer';
import { compose } from 'redux';
import { withComponentId } from '../../../../common/ComponentIdContext';
import { connect } from 'react-redux';
import { searchTextInListByListKey } from '../../../../helpers/Common';

class THeadDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerChecked: '',
      textSearch: '',
      listLookupItems: [],
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.listLookupItems !== this.props.listLookupItems) {
      this.setState({ listLookupItems: nextProps.listLookupItems });
    }
    if (nextProps.tickerChecked !== this.props.tickerChecked) {
      this.setState({
        tickerChecked: nextProps.tickerChecked,
      });
    }
  }

  filterColumn = e => {
    const { listLookupItems } = this.props;
    const textSearch = e.target.value;

    const listKeyFilter = ['ticker', 'organShortName'];

    const { result: newListLookupItems } = searchTextInListByListKey(
      listLookupItems,
      textSearch,
      listKeyFilter,
    );

    this.setState({
      listLookupItems: newListLookupItems,
      textSearch,
    });
  };

  initialState = () => {
    const { tickerChecked, listLookupItems } = this.props;

    this.setState({
      tickerChecked,
      textSearch: '',
      listLookupItems,
    });
  };

  handleButtonToggle = toggle => () => {
    this.initialState();
    toggle();
  };

  renderAction = toggle => {
    return (
      <button
        className="dropdown-toggle"
        type="button"
        aria-haspopup="true"
        onClick={this.handleButtonToggle(toggle)}
        aria-expanded="false"
      >
        <i className="icon-caret fs-11 ml-2" />
      </button>
    );
  };

  changeColumnComparing = showHide => () => {
    const {
      changeColumnComparingCheckup,
      keyItem,
      componentId,
      isBanking,
    } = this.props;

    const { tickerChecked } = this.state;
    const { tickerChecked: tickerCheckedOld } = this.props;

    if (tickerChecked !== tickerCheckedOld) {
      const params = {
        positionCompareItem: keyItem,
        tickerCheckedOld,
        tickerChecked,
      };
      changeColumnComparingCheckup(params, isBanking, componentId);
    }
    showHide(false);
  };

  renderSearch = showHide => {
    const { textSearch } = this.state;

    return (
      <div className="search-box mt-5">
        <input
          className="search-input"
          value={textSearch}
          type="search"
          onChange={this.filterColumn}
          placeholder={I18n.t('common.searchAdd.search')}
        />
        <button type="submit">
          <i className="icon-search" />
        </button>
        <button className="btn-done">
          <span
            className="btn-text-done"
            onClick={this.changeColumnComparing(showHide)}
          >
            {I18n.t('common.DONE')}
          </span>
        </button>
      </div>
    );
  };

  changeColumnCompareCheckup = item => () => {
    this.setState({ tickerChecked: item.ticker });
  };

  renderListSearch = () => {
    const { listLookupItems, tickerChecked } = this.state;

    return (
      <div className="scroll-column list-check scroll-drop">
        {listLookupItems.length > 0 ? (
          listLookupItems.map(item => {
            return (
              <div className="checkbox row" key={item.key}>
                <input
                  value={item.key}
                  id={item.key}
                  onChange={this.changeColumnCompareCheckup(item)}
                  type="checkbox"
                  name="compareCheckupItem"
                  checked={tickerChecked === item.ticker}
                  style={{ cursor: 'pointer' }}
                />
                <label className="text-item-title">{item.ticker}</label>
                <span className="text-item-content text-overflow">
                  {item.organShortName}
                </span>
              </div>
            );
          })
        ) : (
          <label className="text-no-data">{I18n.t('common.NO_DATA')}</label>
        )}
      </div>
    );
  };

  renderPopup = (showHide, isShow) => {
    return (
      isShow && (
        <div
          className="dropdown-menu dropdown-menu-right drop-th drop-mecus show"
          aria-labelledby="dropdownMenuButton"
          style={{
            position: 'absolute',
            willChange: 'transform',
            top: '0px',
            left: '0px',
            transform: 'translate3d(-200px, 33px, 10px)',
          }}
        >
          {this.renderSearch(showHide)}
          {this.renderListSearch()}
        </div>
      )
    );
  };

  render() {
    return (
      <Toggle
        appendClassName={['d-inline-block']}
        renderAction={this.renderAction}
        renderPopup={this.renderPopup}
      />
    );
  }
}

const mapStateToProps = (state, { componentId }) => {
  return {
    listDataCheckup:
      state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
        .listDataCheckup,
    listLookupItems:
      state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
        .listLookupItems,
    yearReport:
      state[REDUCER_NAME].listMultiComponent[componentId].faCheckupData
        .yearReport,
    isBanking:
      state[REDUCER_NAME].listMultiComponent[componentId].searchParams
        .isBanking,
  };
};

const mapDispatchToProps = { changeColumnComparingCheckup };

THeadDropDown.propTypes = {};

THeadDropDown.defaultProps = {
  listDataCheckup: {},
};

export default compose(
  withComponentId,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(THeadDropDown);
