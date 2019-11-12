import React, { PureComponent } from 'react';
import { I18n } from "react-redux-i18n";
import { connect } from 'react-redux';

class TopFooter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      footer : props.footer
    };
  }
  render() {
    const footerText = this.state.footer;
    return (
      <div className="unit-title-note" style={{ marginTop: 6, marginBottom: 6 }}>{footerText}</div>
    );
  }  
}

const mapStateToProps = (state) => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(TopFooter)
