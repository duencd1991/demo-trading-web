import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { REDUCER_NAME, setNewsByExpertData } from '../../../../../../reducer';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="d-flex">
        <div style={{ marginRight: 8 }}>Share:</div>
        <div className="d-flex">
          <a style={{ color: 'white', marginRight: 4 }} href="#">
            <i className="icon-facebook" />
          </a>
          <a style={{ color: 'white', marginRight: 4 }} href="#">
            <i className="icon-facebook" />
          </a>
          <a style={{ color: 'white', marginRight: 4 }} href="#">
            <i className="icon-facebook" />
          </a>
          <a style={{ color: 'white', marginRight: 4 }} href="#">
            <i className="icon-facebook" />
          </a>
        </div>
      </div>
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
)(Share);
