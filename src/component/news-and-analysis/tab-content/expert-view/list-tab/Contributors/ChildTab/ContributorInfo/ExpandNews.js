import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { REDUCER_NAME, setNewsByExpertData } from '../../../../../../reducer';

import './index.scss';

class ExpandNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
    };
  }
  handleOnclick = () => {
    this.setState(({ isExpand }) => {
      return { isExpand: isExpand ? false : true };
    });
  };

  onClickNew = newsId => {
    const { setNewsByExpertData } = this.props;
    setNewsByExpertData('newId', newsId);
  };

  render() {
    const { theme, timeStamp = 'dateTime', listNews = [] } = this.props;
    const { isExpand } = this.state;

    return (
      <li
        className={`${isExpand ? 'active' : ''}`}
        onClick={this.handleOnclick}
      >
        <p className="">{timeStamp}</p>
        {isExpand && (
          <>
            {listNews.map((data, index) => {
              return (
                <div
                  key={index}
                  className="d-flex"
                  onClick={() => this.onClickNew(data.newsId)}
                >
                  <div className="mr-3">
                    {moment(data.publicDate).format('DD/MM')}
                  </div>
                  <div>{data.newsTitle}</div>
                </div>
              );
            })}
          </>
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  theme: state.theme,
});

const mapDispatchToProps = {
  setNewsByExpertData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpandNews);
