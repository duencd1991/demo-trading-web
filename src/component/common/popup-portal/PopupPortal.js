import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import store from '../../../component/app/store';
const portalNodes = {};
export default class PopupPortal extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    group: PropTypes.string,
    parentRef: PropTypes.object,
  };

  static defaultProps = {
    active: false,
    group: 'main',
    parentRef: document.body,
  };

  createPortal() {
    portalNodes[this.props.group] = {
      node: document.createElement('div'),
      timeout: false,
      parentRef: this.props.parentRef ? this.props.parentRef : document.body,
    };
    portalNodes[this.props.group].node.className = 'PopupPortal';
    portalNodes[this.props.group].parentRef.appendChild(
      portalNodes[this.props.group].node,
    );
  }

  renderPortal(props) {
    if (!portalNodes[this.props.group]) {
      this.createPortal();
    }
    let { ...other } = props;
    ReactDOM.render(
      <Provider store={store}>
        <>{this.props.children}</>
      </Provider>,
      portalNodes[this.props.group].node,
    );
  }

  componentDidMount() {
    if (!this.props.active) {
      return;
    }
    this.renderPortal(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (!portalNodes[this.props.group] && !nextProps.active) ||
      (!this.props.active && !nextProps.active)
    ) {
      return;
    }
    if (!nextProps.active) {
      this.componentWillUnmount();
    } else {
      this.renderPortal(nextProps);
    }
  }

  componentWillUnmount() {
    if (portalNodes[this.props.group]) {
      ReactDOM.unmountComponentAtNode(portalNodes[this.props.group].node);
      clearTimeout(portalNodes[this.props.group].timeout);

      try {
        document.body.removeChild(portalNodes[this.props.group].node);
      } catch (e) {}

      portalNodes[this.props.group] = null;
    }
  }

  render() {
    return null;
  }
}
