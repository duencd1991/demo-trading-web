import React, { Component } from 'react';
import Const from './Const';
import { connect } from 'react-redux';
import InforHeader from './InforHeader';
import {
  fetchListDataOwnership,
  deleteId,
  setUpData,
  fetchListSearch,
} from './reducer';
import './index.scss';
import TabContent from './table-content/TabContent';
import ScrollComponent from './../../common/ScrollComponent';
import ChartOwnership from './ChartOwnership';
import { I18n } from 'react-redux-i18n';
import withPreRender from './../../common/withPreRender';
import ConstCommon from './../../common/Const';
import { compose } from 'redux';
import Export from './Export';
import { REDUCER_NAME } from '../../market/watchlist/reducer';

class Ownership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTab: [
        {
          value: 'marjorShareHolders',
          isSelected: true,
          index: Const.listTab.MajorShareHolders.Index,
        },
        {
          value: 'boardOfDirectors',
          isSelected: false,
          index: Const.listTab.BoardOfDirectors.Index,
        },
      ],
      indexSelectTab: 1,
    };
    const { setUpData, id } = props;
    setUpData(id);
  }

  componentDidMount() {
    const { fetchListDataOwnership, id, fetchListSearch } = this.props;
    fetchListDataOwnership(id);
    fetchListSearch();
  }

  componentDidUpdate(prevProps) {
    const { fetchListDataOwnership, id, fetchListSearch } = this.props;
    if (prevProps.i18n.locale !== this.props.i18n.locale) {
      fetchListDataOwnership(id);
      fetchListSearch();
    }
  }

  componentWillUnmount() {
    const { id, deleteId } = this.props;
    deleteId(id);
  }

  changeTab(value) {
    const { listTab } = this.state;
    const newListTab = listTab.map(item => {
      if (value === item.index)
        return {
          ...item,
          isSelected: true,
        };
      return {
        ...item,
        isSelected: false,
      };
    });
    this.setState({ listTab: newListTab, indexSelectTab: value });
  }

  render() {
    const { listTab, indexSelectTab } = this.state;
    const { id } = this.props;

    return (
      <ScrollComponent>
        <div className="ows-wrapper pl-20 pr-20 h-100 d-flex flex-column">
          <div className="wrap-top-content">
            <div className="ows-top-content">
              <InforHeader id={id} />
            </div>

            <div className="wrap-top-content--right" style={{ marginTop: 30 }}>
              <Export id={id} indexSelectTab={indexSelectTab} />
            </div>
          </div>
          <div className="ows-body-content d-flex flex-fill mb-10">
            <div className="left-content">
              <ChartOwnership id={id} />
            </div>
            <div className="right-content d-flex flex-column">
              <div className="top-tab-content">
                {listTab.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        item.isSelected ? 'ows-tab-content-active' : ''
                      } ows-tab-content hover mr-1"`}
                      onClick={() => this.changeTab(item.index)}
                    >
                      {I18n.t(`ownerShip.tabs.${item.value}`)}
                    </div>
                  );
                })}
              </div>
              <TabContent indexSelectTab={this.state.indexSelectTab} id={id} />
            </div>
          </div>
        </div>
      </ScrollComponent>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteId: id => dispatch(deleteId(id)),
    setUpData: id => dispatch(setUpData(id)),
    fetchListDataOwnership: id => dispatch(fetchListDataOwnership(id)),
    fetchListSearch: () => dispatch(fetchListSearch()),
  };
};

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

export default compose(
  withPreRender(ConstCommon.listComponent.Ownership),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Ownership);
