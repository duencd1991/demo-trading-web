import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Image extends React.Component {
  componentDidMount() {
    const { fetchImage, code } = this.props;
    fetchImage(code);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetchImage, code, theme } = this.props;
    fetchImage(code, theme);
  }

  render() {
    return <img src={this.props.image} alt="" />;
  }
}

const mapStateToProps = (state, { getImageFromRedux, code }) => {
  return {
    image: getImageFromRedux(state)[code],
    theme: state.theme,
  };
};

Image.propTypes = {
  getImageFromRedux: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Image);
