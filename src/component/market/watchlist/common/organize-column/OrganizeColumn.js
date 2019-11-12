import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { I18n } from 'react-redux-i18n';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import './index.scss';
import ScrollComponent from "../../../../common/ScrollComponent";

class OrganizeColumn extends React.Component {

  constructor(props) {
    super(props);
    const { listColumn } = this.props;

    this.state = {
      listColumn: [...listColumn],
      isShowPopup: false,
    };
  }

  isChecked = (listUnCheckedColumn, col) => {
    return !listUnCheckedColumn.includes(col.key);
  };

  changeOrganizeColumn = (colKey) => {
    const { listUnCheckedColumn } = this.props;
    if (listUnCheckedColumn.includes(colKey)) {
      listUnCheckedColumn.splice(listUnCheckedColumn.indexOf(colKey), 1);
    } else {
      listUnCheckedColumn.push(colKey);
    }
    const { changeListHideColumn } = this.props;
    changeListHideColumn(listUnCheckedColumn);
  };

  clearAll = () => {
    const { listColumn, changeListHideColumn } = this.props;
    const listUnCheckedColumn = listColumn.map(item => {
      return item.key;
    });

    changeListHideColumn(listUnCheckedColumn);
  };

  resetToDefault = () => {
    const { changeListHideColumn, listUnCheckedColumnDefault } = this.props;

    changeListHideColumn(listUnCheckedColumnDefault);
  };

  togglePopup = (isShowPopup) => {
    this.setState({ ...this.state, isShowPopup });
  };

  handleClickOutside = () => {
    if (this.state.isShowPopup) {
      this.togglePopup(false);
    }
  };

  filterColumn = (searchText) => {
    const listColumn = this.props.listColumn.filter(item => {
      return item.title.indexOf(searchText.toUpperCase()) !== -1;
    });
    this.setState({ ...this.state, listColumn });
  };

  render() {
    const { listColumn, isShowPopup } = this.state;
    const { listUnCheckedColumn } = this.props;
    const className = isShowPopup ? 'dropdown-menu drop-mecus drop-normal show' : 'dropdown-menu drop-mecus drop-normal';
    return (
      <div className="organize-column-wrap fiidropdown right setting-header item-btn">
        <div className="dropdown">
          <button className="btn btn-cus bg-b-color-3 dropdown-toggle" type="button"
                  aria-haspopup="true" aria-expanded="false" onClick={() => this.togglePopup(true)}
                  title={I18n.t('watchListSummary.settingIcon')}>
            <i className="icon-settings fs-11"/>
          </button>
          <div className={className} aria-labelledby="dropdownMenuButton" style={{
            position: 'absolute',
            top: 71,
            right: 0,
            willChange: 'transform',
            transform: 'translate3d(-134px, -50px, 0px)'
          }}>
            <div className="header-text">{I18n.t('watchListSummary.manageColumn')}</div>
            <hr/>
            <div className="search-box mt-5">
              <input className="search-input" type="search" placeholder="Search"
                     onChange={(e) => this.filterColumn(e.target.value)}/>
              <button type="submit"><i className="icon-search"/></button>
            </div>
            <div className="list-check">
              <ScrollComponent appendStyle={{ maxHeight: 140 }}>
              {
                listColumn.length > 0
                  ? listColumn.map(item => {
                    return (
                      <div className="checkbox" key={item.key}>
                        <input id={item.key} onChange={debounce(() => this.changeOrganizeColumn(item.key), 100)}
                               type="checkbox"
                               style={{ cursor: "pointer" }}
                               checked={this.isChecked(listUnCheckedColumn, item)}/>
                        <label htmlFor={item.key}>{item.title}</label>
                      </div>
                    );
                  })
                  : <label className="text-no-data">{I18n.t('common.NO_DATA')}</label>
              }
              </ScrollComponent>
            </div>
            <hr/>
            <div className="item-drop" style={{ cursor: "pointer" }} onClick={debounce(this.clearAll, 100)}>
              <i className="icon-cancel"/> {I18n.t('watchListSummary.clearAll')}
            </div>
            <div className="item-drop" style={{ cursor: "pointer" }} onClick={debounce(this.resetToDefault, 100)}>
              <i className="icon-reset"/> {I18n.t('watchListSummary.resetToDefault')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(enhanceWithClickOutside(OrganizeColumn));
