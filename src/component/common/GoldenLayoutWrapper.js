import React from 'react';
import GoldenLayout from 'golden-layout';
import PropTypes from 'prop-types';
import { connect, useStore } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import LayoutHelper from '../helpers/Layout';
import {
  calendar,
  layoutDefault,
  nameSaveStateDefault,
} from '../../configs/LayoutConfig';
import widgetConfig from './../../configs/WidgetConfig';
import { getMinSizeComponent, getUnique } from './../helpers/Common';
import { changeCountComponent } from './../app/commonReducer';
import { toggleIntro } from '../app/reducer';

export const COMPONENT_RESIZE = 'COMPONENT_RESIZE';
export const LAYOUT_TAB_CREATED = 'LAYOUT_TAB_CREATED';
export const LAYOUT_STACK_CREATED = 'LAYOUT_STACK_CREATED';
export const LAYOUT_ITEM_DESTROYED = 'LAYOUT_ITEM_DESTROYED';
export const COMPONENT_DRAG = 'COMPONENT_DRAG';

const getAllComponent = root => {
  if (!root.contentItems) {
    return [];
  }
  return root.contentItems.reduce((result, item) => {
    if (item.componentName) {
      return result.concat(item);
    }

    return result.concat(getAllComponent(item));
  }, []);
};

const getStackMaximized = root => {
  let stack = null;
  const findStackMaximized = root => {
    if (stack) {
      return stack;
    }
    if (!root.contentItems) {
      return stack;
    }
    root.contentItems.forEach(item => {
      if (item.config.type === 'stack' && item.isMaximised) {
        stack = item;
        return;
      }

      stack = findStackMaximized(item);
    });

    return stack;
  };

  return findStackMaximized(root);
};

class GoldenLayoutWrapper extends React.Component {
  componentDidMount() {
    const { minItemWidth, minItemHeight } = getMinSizeComponent();
    const savedState = LayoutHelper.getState(nameSaveStateDefault);
    if (savedState !== null) {
      this.layout = new GoldenLayout(
        this.getGlState(savedState),
        this.layoutRef,
      );
    } else {
      this.layout = new GoldenLayout(
        {
          ...layoutDefault,
          minItemWidth,
          minItemHeight,
        },
        this.layoutRef,
      );
    }

    this.layout.init();
    //LayoutHelper.set(this.layout, this.context.store);
    LayoutHelper.set(this.layout, this.props.store);
    window.addEventListener('resize', () => {
      if (this.layout) {
        this.layout.updateSize();
      }
    });

    this.layout.on('componentCreated', component => {
      const maximized = getStackMaximized(this.layout.root);
      if (maximized) {
        maximized.toggleMaximise();
      }
      component.config.title = I18n.t(
        `common.listComponent.${component.config.component}`,
      );
      const id = getUnique();
      component.config.props = {
        ...component.config.props,
        id,
      };
      this.changeCountComponent(component, 1);
      this.dispatchChangeSizeComponent(component, id);

      const componentName =
        component && component.config && component.config.component;
      if (componentName && id) {
        this.dispatch(
          componentName,
          {
            id,
          },
          'INIT_COMPONENT',
        );
      }

      component.container.on('resize', () => {
        this.dispatchChangeSizeComponent(component, id);

        const componentName = component.config.component;
        this.dispatchEvent(COMPONENT_RESIZE, componentName);
      });
    });

    this.layout.on('tabCreated', tab => {
      const componentName = tab.contentItem.config.component;
      this.dispatchEvent(LAYOUT_TAB_CREATED, componentName);

      tab._dragListener.on('drag', () => {
        const componentName = tab.contentItem.config.component;
        this.dispatchEvent(COMPONENT_DRAG, componentName);
      });
    });

    this.layout.on('stackCreated', stack => {
      this.dispatchEvent(LAYOUT_STACK_CREATED);
      // this.toggleIntro(true);

      this.limitDropComponent(stack, minItemWidth, minItemHeight);
      this.changeZIndexWhenMaximum(stack);
    });

    this.layout.on('itemDestroyed', item => {
      this.changeCountComponent(item, -1);
      const componentName = item && item.config && item.config.component;
      const componentId =
        item && item.config && item.config.props && item.config.props.id;

      if (componentName && componentId) {
        this.dispatch(componentName, { id: componentId }, 'UNMOUNT_COMPONENT');
      }

      this.dispatchEvent(LAYOUT_ITEM_DESTROYED);
    });
  }

  dispatchEvent = (eventName, componentName = null) => {
    const event = new CustomEvent(eventName, {
      detail: componentName,
    });
    window.dispatchEvent(event);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { locale } = this.props;
    if (locale !== prevProps.locale) {
      this.changeComponentTitle();
    }
  }

  getGlState = savedState => {
    const glState = JSON.parse(savedState);
    const changeComponentTitle = state => {
      if (!state.content) {
        return;
      }

      state.content.forEach(item => {
        if (item.component) {
          item.title = I18n.t(`common.listComponent.${item.component}`);
          return;
        }

        changeComponentTitle(item);
      });
    };
    changeComponentTitle(glState);

    return glState;
  };

  changeComponentTitle = () => {
    getAllComponent(LayoutHelper.layout.root).forEach(component => {
      component.setTitle(
        I18n.t(`common.listComponent.${component.config.component}`),
      );
    });
  };

  dispatch(componentName, payload, type) {
    widgetConfig.forEach(({ list }) => {
      list.forEach(({ listReducer, name }) => {
        if (componentName === name) {
          listReducer &&
            listReducer.forEach(item => {
              //this.context.store.dispatch({
                this.props.store.dispatch({
                type: `${item}${type}`,
                payload,
              });
            });
        }
      });
    });
  }

  changeCountComponent = (component, count) => {
    const componentName = component.config.component;
    //this.context.store.dispatch(changeCountComponent(componentName, count));
    this.props.store.dispatch(changeCountComponent(componentName, count));
  };

  toggleIntro = status => {
    //this.context.store.dispatch(toggleIntro(status));
    this.props.store.dispatch(toggleIntro(status));
  };

  dispatchChangeSizeComponent = (component, id) => {
    const { width, height } = component.container;
    const componentName = component.config.component;
    try {
      if (width < calendar.minWidth) {
        component.container._element.addClass(calendar.className);
      } else {
        component.container._element.removeClass(calendar.className);
      }
    } catch (e) {}

    this.dispatch(
      componentName,
      { width, height, id },
      'CHANGE_SIZE_COMPONENT',
    );
  };

  limitDropComponent = (e, minItemWidth, minItemHeight) => {
    e._$highlightDropZone = function(x, y, areaSurface) {
      var segment, area;

      for (segment in this._contentAreaDimensions) {
        area = this._contentAreaDimensions[segment].hoverArea;
        const highlightArea = this._contentAreaDimensions[segment]
          .highlightArea;

        if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {
          if (segment === 'header') {
            this._dropSegment = 'header';
            this._highlightHeaderDropZone(this._sided ? y : x);
          } else {
            if (
              highlightArea.x2 - highlightArea.x1 < minItemWidth ||
              highlightArea.y2 - highlightArea.y1 < minItemHeight
            ) {
              this._dropSegment = 'header';
              return;
            }
            this._resetHeaderDropZone();
            this._highlightBodyDropZone(segment);
          }

          return;
        }
      }
    };
  };

  changeZIndexWhenMaximum = stack => {
    stack.header.controlsContainer
      .find('.lm_maximise') //get the maximise icon
      .click(function() {
        //Get maximise and minimise events here
        const Z_INDEX = 1000;
        if (parseInt(stack.element[0].style.zIndex) !== Z_INDEX) {
          stack.element[0].style.zIndex = Z_INDEX;
        } else {
          stack.element[0].style.zIndex = null;
        }
      });
  };

  render() {
    return (
      <div
        id="goldenLayout"
        className="goldenLayout"
        ref={input => (this.layoutRef = input)}
      />
    );
  }
}

GoldenLayoutWrapper.contextTypes = {
  //store: PropTypes.object.isRequired,
  locale: PropTypes.string,
};

const mapStateToProps = state => ({
  locale: state.i18n.locale,
});

export default connect(mapStateToProps)(GoldenLayoutWrapper);
