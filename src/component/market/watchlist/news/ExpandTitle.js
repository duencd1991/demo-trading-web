import React from 'react';
import './expand-title.scss';
import { I18n } from 'react-redux-i18n'
class ExpandTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowExpand: false,
    };
  }

  toggleExpand = () => {
      const {item: {newsId}, selectNewsId} = this.props
      this.setState({...this.state, isShowExpand: !this.state.isShowExpand});
      this.props.selectNewsId(newsId)
  };

  render() {
    const { children: title, item: {newsShortContent, newsTitle, newsId, newsSourceLink}, currentNewsId } = this.props
    const { isShowExpand } = this.state


    const className = `content-expand ${(isShowExpand && currentNewsId === newsId) ? "show" : "" }`

    return (
      <div className="text-left expand-title-wrap" onClick={() => this.toggleExpand(title)}>
        <div className="header-title"><a href={`#${newsId}`} style={{ cursor: 'pointer' }}>{newsTitle}</a>
        </div>
        <div className={className}>
          <div className="content-des text-l-color-1">
            {newsShortContent}
            <a  target='_blank' rel="noopener" href={newsSourceLink}>{I18n.t('watchListNews.readMore')}</a>
          </div>
          <div className="share-sns mt-5 mb-5">
            <span>Share</span>&nbsp;
            <a href="#"><i className="icon-facebook"/></a>&nbsp;
            <a href="#"><i className="icon-zalo"/></a>&nbsp;
            <a href="#"><i className="icon-skype"/></a>&nbsp;
            <a href="#"><i className="icon-share-chart"/></a>&nbsp;
            <a href="#"><i className="icon-gmail"/></a>&nbsp;
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandTitle;
