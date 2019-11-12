import React from 'react';
import './star-fill.scss';
import { connect } from 'react-redux';
import { REDUCER_NAME, toggleNewFavorite } from '../../reducer';
class FavoriteSpan extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassName = (item = {}) => {
    const { currentTab, storesName, currentChildTab } = this.props;
    const { newsId, isFavorite } = item;
    const localStoreName =
      currentTab === 4
        ? storesName[currentTab][currentChildTab]
        : storesName[currentTab];

    let listIds = JSON.parse(localStorage.getItem(localStoreName)) || [];

    if (currentTab === 4 && currentChildTab === 4) {
      const listIdsInLocalStoreMostRecent =
        JSON.parse(localStorage.getItem(storesName[4][1])) || [];
      const listIdsInLocalStoreMostPopular =
        JSON.parse(localStorage.getItem(storesName[4][2])) || [];
      //data in Local Store

      const combineListIdsInLocalStore = [
        ...listIdsInLocalStoreMostRecent,
        ...listIdsInLocalStoreMostPopular,
      ];

      listIds = combineListIdsInLocalStore || [];
    }

    let className = '';
    if (listIds.indexOf(newsId) === -1) {
      className = `star-wrapper non-selected ${
        isFavorite ? 'active' : 'non-active'
      }`;
      return className;
    }
    className = `star-wrapper non-selected active`;
    return className;
  };

  render() {
    const { item, toggleNewFavorite, currentTab, currentChildTab } = this.props;
    const className = this.getClassName(item);
    const isFavorite = className === 'star-wrapper non-selected active';
    return (
      <div className="text-center sf-wrapper">
        <span
          className={className}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            toggleNewFavorite(item.newsId, isFavorite, {
              parentTab: currentTab,
              childTab: currentChildTab,
            })
          }
        >
          <i className="icon-star" />
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storesName: state[REDUCER_NAME].storesName,
    currentTab: state[REDUCER_NAME].currentTab,
    currentChildTab: state[REDUCER_NAME].currentChildTab,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNewFavorite: (id, isFavorite, currentTab) =>
      dispatch(toggleNewFavorite(id, isFavorite, currentTab)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteSpan);
