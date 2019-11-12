import React from 'react';
import {
  COMPONENT_DRAG,
  LAYOUT_STACK_CREATED,
  LAYOUT_TAB_CREATED,
} from './GoldenLayoutWrapper';
import { layoutDefault } from './../../configs/LayoutConfig';

const withPreRender = componentName => Component => {
  class WithPreRender extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isRender: this.getIsRender(),
      };
      this.rootRef = React.createRef();
    }

    componentDidMount() {
      this.checkRender();
      window.addEventListener(LAYOUT_STACK_CREATED, this.checkRender);
      window.addEventListener(LAYOUT_TAB_CREATED, this.checkRender);

      // window.addEventListener(COMPONENT_DRAG, this.componentDrag);
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutWidth);
      window.removeEventListener(LAYOUT_STACK_CREATED, this.checkRender);
      window.removeEventListener(LAYOUT_TAB_CREATED, this.checkRender);
      // window.removeEventListener(COMPONENT_DRAG, this.componentDrag);
    }

    getIsRender = () => {
      const { glContainer } = this.props;
      return glContainer ? glContainer.isHidden : false;
    };

    componentDrag = e => {
      if (componentName === e.detail) {
        this.setState({
          isRender: false,
        });
        // window.removeEventListener(COMPONENT_DRAG, this.componentDrag);
        window.addEventListener(LAYOUT_STACK_CREATED, this.checkRender);
        window.addEventListener(LAYOUT_TAB_CREATED, this.checkRender);
      }
    };

    checkRender = () => {
      this.timeoutWidth = setTimeout(() => {
        if (!this.rootRef.current) {
          return;
        }
        const width = this.rootRef.current.clientWidth;
        if (width > layoutDefault.dimensions.dragProxyWidth) {
          this.setState({
            isRender: true,
          });
          window.removeEventListener(LAYOUT_STACK_CREATED, this.checkRender);
          window.removeEventListener(LAYOUT_TAB_CREATED, this.checkRender);
          // window.addEventListener(COMPONENT_DRAG, this.componentDrag);
        }
      }, 0);
    };

    render() {
      const { isRender } = this.state;
      if (!isRender) {
        return <div ref={this.rootRef} className="h-100 w-100" />;
      }

      return <Component {...this.props} />;
    }
  }

  return WithPreRender;
};

export default withPreRender;
