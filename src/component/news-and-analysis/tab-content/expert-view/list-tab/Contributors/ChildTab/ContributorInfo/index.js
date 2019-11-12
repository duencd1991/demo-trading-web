import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './index.scss';
import { Responsive } from '../../../../../../../common/responsive';
import { REDUCER_NAME, setNewsByExpertData } from '../../../../../../reducer';
import menAvatar from '../../../../../../common/asset/men.svg';
import womenAvatar from '../../../../../../common/asset/women.svg';
import ExpandNews from './ExpandNews';
import ShareNews from './Share';

class ContributorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }

  setTab = currentTab => {
    this.setState({ currentTab });
  };

  handleBack = (key, value) => {
    const { setNewsByExpertData } = this.props;
    setNewsByExpertData(key, value);
  };

  formatData = expertData => {
    const formatedData = {};
    const months = expertData.map(data => {
      // return moment(data.publicDate).format('MMMM, YYYY')
      return data.publicDate;
    });

    months.forEach(month => {
      const filteredData = expertData.filter(data => {
        return (
          moment(data.publicDate).format('MMMM, YYYY') ===
          moment(month).format('MMMM, YYYY')
        );
      });
      formatedData[moment(month).format('MMMM, YYYY')] = filteredData;
    });
    return formatedData;
  };

  render() {
    const {
      contributorsData: {
        currentExpert: { expertId, expertData, newId },
        data,
      },
    } = this.props;
    const newsData = this.formatData(expertData);
    const workInfo = newId
      ? expertData.find(singleNew => singleNew.newsId === newId)
      : {};
    const style = newId ? { marginLeft: 9 } : {};
    const expertInfo = data.find(person => person.personId === expertId);
    const {
      avatar,
      fullName,
      gender,
      positionName,
      workHistory,
      education,
      email,
    } = expertInfo;
    return (
      <div className="contributor-info-wrapper">
        <div className="left-content pr-0">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => this.handleBack('expertId', null)}
            className="d-flex"
          >
            <i
              style={{ marginTop: 3, marginRight: 4 }}
              className="icon-caret-left"
            />
            All Contributors
          </div>
          <div className="d-flex contributor-info">
            <div className="avatar">
              <img
                className="avatar-img"
                src={avatar || (gender === 1 ? menAvatar : womenAvatar)}
                alt="avt"
              />
            </div>
            <div className="info">
              <div className="main-title">{fullName}</div>
              <div className="sub-title">{positionName}</div>
              <div className="sub-title">Fiintrade</div>
              {/* <div className={`following active`}>{`Following`}</div> */}
              <div className={`following`}>{`Following`}</div>
            </div>
          </div>

          <div className="contributor-summary">
            <div dangerouslySetInnerHTML={{ __html: workHistory }} />
          </div>
          <div className="d-flex flex-wrap">
            <div className="text-bold">Major:</div>
            <div className="cl-grey" style={{ marginLeft: 4 }}>
              {education}
            </div>
          </div>
          <div className="contributor-contact">
            <div className="text-bold">Contact:</div>
            {email && (
              <div className="list-contact">
                <a href="#">
                  <i className="icon-gmail" />
                  <div className="cl-grey">{email}</div>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="right-content" style={style}>
          {newId && (
            <div className="work-info">
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex"
                onClick={() => this.handleBack('newId', null)}
              >
                <i
                  style={{ marginTop: 3, marginRight: 4 }}
                  className="icon-caret-left"
                />
                All Work
              </div>
              <div className="work">
                <div className="title">{workInfo.newsTitle}</div>
                <div className="date cl-grey">
                  {moment(workInfo.publicDate).format('DD-MM-YYYY HH:mm')}
                </div>
                <div className="d-flex align-items-center">
                  <ShareNews />
                  <div
                    className="d-flex align-items-center"
                    style={{ marginLeft: 8 }}
                  >
                    Favorite:
                    <div className="sf-wrapper">
                      <span
                        className="star-wrapper non-selected non-active"
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="icon-star" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div style={{ marginTop: 16, marginBottom: 8 }}>Summary</div> */}
                <div className="d-flex flex-column">
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: workInfo.newsFullContent,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {!newId && (
            <ul className="timeline">
              <div className="">
                <div
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 27,
                  }}
                  onClick={() => this.handleBack('newId', null)}
                  className="d-flex"
                >
                  All Work
                </div>
              </div>
              {Object.keys(newsData).map((timeStamp, index) => {
                return (
                  <ExpandNews
                    key={index}
                    timeStamp={timeStamp}
                    listNews={newsData[timeStamp]}
                  />
                );
              })}
              {/* <li className="active">
              <div className="d-flex">
                <div className="mr-3">October</div>
              </div>
              <div className="d-flex">
                <div className="mr-3">10/24</div>
                <div onClick={() => this.setTab(2)}>China Is the World’s Retail Laboratory</div>
              </div>
              <div className="d-flex">
                <div className="mr-3">10/24</div>
                <div>China Is the World’s Retail Laboratory</div>
              </div>
              <div className="d-flex">
                <div className="mr-3">10/24</div>
                <div>China Is the World’s Retail Laboratory</div>
              </div>
            </li>
            <li>
              <p className="cl-grey">September</p>
            </li>
            <li>
              <p className="cl-grey">September</p>
            </li>
            <li>
              <p className="cl-grey">September</p>
            </li>
            <li>
              <p className="cl-grey">September</p>
            </li>
            <li>
              <p className="cl-grey">2018</p>
            </li> */}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    component: state[REDUCER_NAME].component,
    contributorsData: state[REDUCER_NAME].contributorsData,
  };
};

const mapDispatchToProps = {
  setNewsByExpertData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContributorInfo);
