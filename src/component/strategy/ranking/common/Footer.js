import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  theme: state.theme,
  i18n: state.i18n,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

function Footer(props) {
  return (
    <div
      className="unit-title-note"
      style={{ marginTop: '6px', marginBottom: '6px' }}
    >
      <span>{I18n.t('stRanking.footerText')}</span>
      <a href="#" target="_blank">
        <span>{I18n.t('stRanking.footerClickHere')}</span>
      </a>
    </div>
  );
}
