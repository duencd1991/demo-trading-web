import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import {
  REDUCER_NAME,
  fetchContributor,
  getNewsByExpert,
} from '../../../../reducer';
import './index.scss';
import avtImg from '../../../../common/asset/avatar.jpg';

import menDefaultAvt from '../../../../common/asset/men.svg';
import womenDefaultAvt from '../../../../common/asset/women.svg';

import { Responsive } from '../../../../../common/responsive';

import Loading from '../../../../common/loading/Loading';

const dummyPeople = [...Array(30)].map((_, index) => {
  return {
    id: index,
    name: 'Dung X. Nguyen',
    jobTitle: 'Finance Director',
    company: 'VanGuard',
    isFollowing: false,
    avt: avtImg,
  };
});

// data fake for dev environment

class Contributors extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchContributor } = this.props;
    fetchContributor();
  }

  onClickAvatar = id => {
    const { getNewsByExpert } = this.props;
    console.log(id);
    getNewsByExpert(id);
  };

  onClickFollowing = id => {
    const { getNewsByExpert } = this.props;
    getNewsByExpert(id);
    // const { listPeople } = this.state;
    // const listNewPeople = listPeople.map(item => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       isFollowing: !item.isFollowing,
    //     };
    //   }
    //   return item;
    // });

    // this.setState({ listPeople: listNewPeople });
  };

  render() {
    const {
      component,
      contributorsData: { data, isLoading },
    } = this.props;
    const listPeople = data.map(person => {
      return {
        id: person.personId,
        name: person.fullName,
        jobTitle: person.positionName,
        company: person.workHistory || 'Fiintrade',
        // company: 'Fiintrade',
        isFollowing: false,
        avt:
          person.avatar ||
          (person.gender === 1 ? menDefaultAvt : womenDefaultAvt),
      };
    });

    const optStyle = isLoading
      ? {
          backgroundColor: 'rgba(31, 35, 41, .9)',
          userSelect: 'none',
          pointerEvents: 'none',
        }
      : {};
    // showLoading on fetch data

    return (
      <div className="contributor-wrapper" style={optStyle}>
        {isLoading && <Loading />}
        <Responsive component={component} offsetWidth={40} XS_SIZE={400}>
          {listPeople.slice().map((person, index) => {
            return () => (
              <div key={index} className="d-flex contributor">
                <div
                  className="avatar"
                  onClick={() => this.onClickAvatar(person.id)}
                >
                  <img className="avatar-img" src={person.avt} alt="avt" />
                </div>
                <div className="info">
                  <div
                    className="main-title"
                    onClick={() => this.onClickAvatar(person.id)}
                  >
                    {person.name}
                  </div>
                  <div className="sub-title">{person.jobTitle}</div>
                  <div
                    className={`following  ${
                      person.isFollowing ? 'active' : ''
                    }`}
                    // onClick={() => this.onClickFollowing(person.id)}
                  >{`Follow${person.isFollowing ? 'ing' : ''}`}</div>
                </div>
              </div>
            );
          })}
        </Responsive>
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
  fetchContributor,
  getNewsByExpert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contributors);
