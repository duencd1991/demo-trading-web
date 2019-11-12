import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TradingViewUrl = ({ code, locale, theme }) => {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('lang', locale);
  params.append('theme', theme);
  const url = `/charting?${params.toString()}`;
  return (
    <a
      onClick={e => {
        e.stopPropagation();
      }}
      className="trading-view-url"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <i className="icon-graph fs-10" />
    </a>
  );
};

TradingViewUrl.propTypes = {
  code: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = ({ theme, i18n }) => ({ theme, locale: i18n.locale });

export default connect(mapStateToProps)(TradingViewUrl);
