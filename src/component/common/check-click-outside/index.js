import React from 'react';
import { connect } from 'react-redux';
import { toggleIntro } from '../../app/reducer';

class TAClickOutside extends React.PureComponent {
  constructor(props) {
    super(props);
    this.refRoot = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('click', this.clickOutside);
    toggleIntro(true);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside);
  }

  clickOutside = e => {
    const { toggleIntro, isShowIntro } = this.props;

    if (this.refRoot && !this.refRoot.current.contains(e.target)) {
      if (!isShowIntro) return;
      console.log('close intro');
      // toggleIntro(false)
    }
  };
  render() {
    const { children } = this.props;
    return (
      <div ref={this.refRoot} className="test-class">
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    isShowIntro: state.isShowIntro,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleIntro: status => dispatch(toggleIntro(status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TAClickOutside);
