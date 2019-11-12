import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { COMPONENT_RESIZE } from '../GoldenLayoutWrapper';
import './size-tracker.scss';

const RESIZE_WAIT = 10;

class SizeTracker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
    };
    this.debouncedResize = debounce(this.onComponentResize, RESIZE_WAIT);
  }

  divRef = React.createRef();

  componentDidMount() {
    this.calcSize();
    window.addEventListener(COMPONENT_RESIZE, this.debouncedResize);
  }

  componentWillUnmount() {
    window.removeEventListener(COMPONENT_RESIZE, this.debouncedResize);
    clearTimeout(this.timeoutSize);
  }

  calcSize = () => {
    this.timeoutSize = setTimeout(() => {
      if (!this.divRef.current) {
        return;
      }
      const { width, height } = this.divRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        this.setState({
          width,
          height,
        });
      }
    }, 0);
  };

  onComponentResize = () => {
    this.calcSize();
  };

  render() {
    const { className, children } = this.props;
    const { width, height } = this.state;
    const isRender =
      width && height && children && typeof children === 'function';

    return (
      <div className={`position-relative ${className}`} ref={this.divRef}>
        <div className="size-tracker-content">
          {isRender && children(width, height)}
        </div>
      </div>
    );
  }
}

SizeTracker.propTypes = {
  className: PropTypes.string.isRequired,
};

export default SizeTracker;
