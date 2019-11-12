import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const THRESHOLD = 0.2;

class Lazy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    const option = {
      root: this.root.closest('table').parentNode.parentNode,
      rootMargin: '0px',
      threshold: THRESHOLD,
    };

    this.observer = new IntersectionObserver(this.callback, option);
    this.observer.observe(this.root);
  }

  callback = (entries) => {
    const { isShow } = this.state;
    const [first] = entries;
    if (first.intersectionRatio > THRESHOLD && !isShow) {
      this.setState({
        isShow: true,
      });
    }
  };

  render() {
    const { isShow } = this.state;
    const { children } = this.props;

    return (
      <div ref={el => this.root = el}>
        {isShow ? children : null}
      </div>
    );
  }
}

Lazy.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Lazy;
