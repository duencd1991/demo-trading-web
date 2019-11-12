import React, { Component } from 'react';
import { connect } from 'react-redux';



class NotFound extends Component {

  componentDidMount() {
    //const listComponentTitle = I18n.t('common.listComponent');

  }

  render() {
    return (
        <div>
          <h1> NOT Found</h1>
        </div>
      );
  }
}


export default connect(
  null,
  null,
)(NotFound);
