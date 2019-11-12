import React from 'react';
import PropTypes from 'prop-types';
import { exportToPdf } from '../../helpers/Export';
import { connect } from 'react-redux';

class Export extends React.PureComponent {
  export = () => {
    const { exportId, exportName, exportConfigs, theme } = this.props;

    exportToPdf(exportId, exportName, theme, exportConfigs);
  };

  render() {
    const { title } = this.props;

    return (
      <a
        href="javascript:void(0)"
        className="btn btn-cus-nomal bg-b-color-3"
        onClick={this.export}
      >
        <i className="icon-printer-tool" />{' '}
        <span className="font-weight-bold">{title}</span>
      </a>
    );
  }
}

Export.propTypes = {
  exportId: PropTypes.string.isRequired,
  exportName: PropTypes.string.isRequired,
  exportConfigs: PropTypes.object,
  title: PropTypes.string,
};

Export.defaultProps = {
  title: '',
};

const mapStateToProps = state => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(Export);
