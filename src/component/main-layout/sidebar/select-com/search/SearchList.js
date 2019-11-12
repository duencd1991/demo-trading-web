import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import widgetConfig from '../../../../../configs/WidgetConfig';
import { setDragPopup } from '../../../reducer';
import { REDUCER_NAME as COMMON_REDUCER_NAME } from './../../../../app/commonReducer';
import ScrollComponent from './../../../../common/ScrollComponent';
import Layout from '../../../../helpers/Layout';

class SearchList extends React.PureComponent {
  handleMouseDown = e => {
    this.isMouseDown = true;
    Layout.layout.on('componentCreated', this.onComponentCreated);
  };

  onComponentCreated = () => {
    if (!this.isMouseDown) {
      return;
    }
    const { showHide } = this.props;
    showHide(false);
    this.isMouseDown = false;
  };

  handleMouseOut = () => {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.props.showHide(false);
    }
  };

  checkEmptySub = (listSubData, listSearch, listComponentTitle) =>
    listSubData.every(
      item => !listSearch.includes(listComponentTitle[item.name]),
    );

  getClassNameGroup = (list, listComponentTitle) => {
    const { listSearch } = this.props;

    let className = 'title-group';
    className = this.checkEmptySub(list, listSearch, listComponentTitle)
      ? ['hide', className].join(' ')
      : ['show', className].join(' ');

    return className;
  };

  getClassNameItem = (component, listComponentTitle) => {
    const { listSearch, countListComponent } = this.props;
    const { name, limit } = component;

    let className =
      limit !== -1 && countListComponent[name] >= limit && 'disabled';

    className = listSearch.includes(listComponentTitle[name])
      ? ['show', className].join(' ')
      : ['hide', className].join(' ');

    return className;
  };

  handleOnClick = (e, component, listComponentTitle) => {
    const { showHide } = this.props;
    showHide(false);
    e.preventDefault();
    const { setDragPopup } = this.props;
    this.isMouseDown = false;
    setDragPopup({
      isShow: true,
      componentName: component.name,
      content: listComponentTitle[component.name],
      organCode: null,
    });
  };

  render() {
    const listComponentTitle = I18n.t('common.listComponent');

    return (
      <ScrollComponent appendStyle={{ height: 'calc(100% - 35px)' }}>
        <div className="group-list drop-100 mt-10">
          {widgetConfig.map(({ name, list }) => {
            return (
              <div key={name}>
                <div
                  className={this.getClassNameGroup(list, listComponentTitle)}
                >
                  {listComponentTitle[name]}
                </div>
                <ul className="list">
                  {list.map(component => {
                    return (
                      <li
                        ref={this.props[component.name]}
                        className={this.getClassNameItem(
                          component,
                          listComponentTitle,
                        )}
                        key={component.name}
                        onMouseDown={this.handleMouseDown}
                        onClick={e =>
                          this.handleOnClick(e, component, listComponentTitle)
                        }
                        onMouseOut={this.handleMouseOut}
                      >
                        <a href="javascript:void(0)">
                          {listComponentTitle[component.name]}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </ScrollComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    i18n: state.i18n,
    countListComponent: state[COMMON_REDUCER_NAME].countListComponent,
  };
};

const mapDispatchToProps = {
  setDragPopup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchList);
