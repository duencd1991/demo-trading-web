import React from 'react';
import Const from './Const';
import { Translate } from 'react-redux-i18n';

const handleClickItem = (props, item) => () => {
  props.clickItemSearch(item.organCode, item.ticker);
};

export default function(props) {
  const { parentListSearchRef, listSearchRef, currentItemActive } = props;
  let className = 'drop-search drop-mecus scroll-drop drop-10';

  if (props.isShow) {
    className = [className, 'show'].join(' ');
  }

  return (
    <div className={className} ref={parentListSearchRef}>
      {props.listFilter.length === 0 ? (
        <a className="dropdown-item" href="#">
          <Translate value="common.NO_MATCHED_STOCK" />
        </a>
      ) : (
        props.listFilter.map((item, index) => {
          const className =
            index === currentItemActive
              ? 'dropdown-item hover'
              : 'dropdown-item';
          return (
            <a
              className={className}
              href="#"
              key={item.ticker}
              ref={el => (listSearchRef[index] = el)}
              onClick={handleClickItem(props, item)}
            >
              <span className="w-20">{item.ticker}</span>
              <span className="w-55 text-truncate">{item.organShortName}</span>
              <span className="w-20" style={{ marginLeft: 15 }}>
                {Const[item.comGroupCode.toUpperCase()]}
              </span>
            </a>
          );
        })
      )}
    </div>
  );
}
