import { wrapComponent } from '../common/Wrapped';

class Layout {
  components = [];
  listComponent = {};

  set(layout, store) {
    this.layout = layout;
    this.store = store;
  }

  register(component) {
    this.components.push(component);
    this.layout.registerComponent(
      component.name,
      wrapComponent(component.component, this.store),
    );
  }

  add(component) {
    this.layout.root.contentItems[0].addChild({
      type: 'react-component',
      component: component.name,
      title: component.title,
      tooltip: component.tooltip,
    });
  }

  isContain(component) {
    return this.components.some(item => item.name === component.name);
  }

  drag(element, component, props = {}) {
    this.layout.createDragSource(element, {
      props,
      title: component.title,
      type: 'react-component',
      component: component.name,
      tooltip: component.tooltip,
    });
  }

  getStateFromConfig = data => {
    let config = null,
      state = {};
    try {
      config = this.layout.toConfig();

      if (this.layout.isInitialised && config) {
        config.data = data;
        state = JSON.stringify(config);
      }
    } catch (err) {
      console.error(err);
    }
    return state;
  };

  saveState = (name, config) => {
    localStorage.setItem(name, config);
  };

  getState = name => {
    return localStorage.getItem(name);
  };

  stackCreated(callback) {
    this.layout.on('stackCreated', callback);
  }

  reload(config) {
    const newConfig = config || this.layout.toConfig();

    this.layout.root.contentItems.forEach(item => {
      item.remove();
    });

    newConfig.content.forEach(item => {
      this.layout.root.addChild(item);
    });
  }
}

export default new Layout();
