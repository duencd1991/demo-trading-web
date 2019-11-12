import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import ScrollComponent from "../ScrollComponent";

class SearchList extends React.Component {
  getStyle = () => {
    const { listSearchPos, isShow } = this.props;
    const initialStyle = {
      transform: 'translate3d(0px, 8px, 0px)',
      willChange: 'transform',
      maxWidth: isShow ? 350 : 0,
    };
    if (!listSearchPos) {
      return {
        ...initialStyle,
        position: 'absolute',
        top: '0px',
        left: '0px',
      };
    }

    return {
      ...initialStyle,
      position: 'fixed',
      top: `${listSearchPos.top}px`,
      left: `${listSearchPos.left}px`,
    };
  };

  render() {
    const { clickItemSearch, schema, listFilter, currentItemActive, parentListSearchRef } = this.props;
    const className = 'drop-search drop-mecus show drop-10';
    const shortenContentStyle = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }

    return (
      <div
        ref={parentListSearchRef}
        className={className}
        style={this.getStyle()}
      >
        <div>
            <ScrollComponent appendStyle={{ maxHeight: 280 }}>
            {
              listFilter.length === 0 &&
              <div className="dropdown-item">{I18n.t('common.NO_MATCHED_STOCK')}</div>
            }
            {
              listFilter.length > 0 && listFilter.map((itemFilter, index) => {
                const className = index === currentItemActive ? 'dropdown-item hover' : 'dropdown-item';
                return (
                  <a key={index} className={className} href="#"
                     ref={(el) => this.props.listSearchRef[index] = el}
                     onClick={() => {
                       clickItemSearch(itemFilter);
                     }}>
                    {
                      schema.map(item => {
                        const text = item.render ? item.render(itemFilter[item.key] || '') : itemFilter[item.key];
                        return <span style={shortenContentStyle} key={item.key} className={item.className}>{text || ''}</span>;
                      })
                    }
                  </a>
                );
              })
            }
            </ScrollComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n,
  };
};

export default connect(mapStateToProps)(SearchList);
