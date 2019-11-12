import React, { Component } from 'react';
import './HeaderTable.scss';
import Const from './Const';
import { connect } from 'react-redux';
const _format = require('string-format');
_format.extend(String.prototype, {});
class HeaderTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { colorLeft, colorRight, title } = this.props;
    let styleObj = {
      backgroundImage: _format(
        'linear-gradient(93deg, {0}, {1})',
        colorLeft || Const.colorGradient.colorLeft,
        colorRight || Const.colorGradient.colorRight,
      ),
    };
    return (
      <div className="header-table" style={styleObj}>
        <span className="header-table-title">{title}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(HeaderTable);
