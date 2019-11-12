import React from 'react';
//TODO import './star-fill.scss';
import { connect } from 'react-redux';
import { REDUCER_NAME } from '../reducer';
class FavoriteSpan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  getClassName = (item = {}) => {
    const { KEY_LOCAL_STORAGE } = this.props;
    const { newsId, isFavorite } = item;
    let listIds = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || [];
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
    const { item, toggleNewFavorite } = this.props;
    // const className = `star-wrapper non-selected ${
    //   item.isFavorite ? 'active' : 'non-active'
    // }`;

    const className = this.getClassName(item);
    const isFavorite =
      className === 'star-wrapper non-selected active' ? true : false;
    return (
      <div className="text-center sf-wrapper">
        <span
          className={className}
          style={{ cursor: 'pointer' }}
          onClick={() => toggleNewFavorite(item.newsId, isFavorite)}
          // onClick={() => toggleNewFavorite(item.newsId, item.isFavorite)}
        >
          <i className="icon-star" />
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    KEY_LOCAL_STORAGE: state[REDUCER_NAME].KEY_LOCAL_STORAGE,
  };
};

export default connect(mapStateToProps)(FavoriteSpan);
