import React, { Component } from 'react';
import { REDUCER_NAME } from './reducer';
import Malarquee from 'react-malarquee';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextBlinkMalarquee from './TextBlinkMalarquee';
import _ from 'lodash';
import Const from './Const';

class MalarqueeContent extends Component {
  getContent = listData => {
    return _.map(listData, (item, key) => {
      return <TextBlinkMalarquee key={key} data={item} />;
    });
  };
  render() {
    let { listData } = this.props;
    listData = _.isEmpty(listData)
      ? {}
      : _.pickBy(listData, function(value, key) {
          return _.includes(Const.listIndexNotiMaque, key);
        });
    if (_.isEmpty(listData)) return null;
    return (
      <Malarquee rate={50} hoverToPause={true}>
        {this.getContent(listData)}
      </Malarquee>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state[REDUCER_NAME].listTableByComGroupCode,
    listData: state[REDUCER_NAME].listTableByComGroupCode,
  };
};
export default compose(
  connect(
    mapStateToProps,
    null,
  ),
)(MalarqueeContent);
