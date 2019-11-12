import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';

export default Item;

Item.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function Item(props) {
  const { text, color, color2, type } = props;

  return (
    <span>
      {color2 ? (
        <>
          <div
            className={`${type}-left-item`}
            style={{ backgroundColor: color }}
          >
            &nbsp;
          </div>
          <div
            className={`${type}-right-item`}
            style={{ backgroundColor: color2 }}
          >
            &nbsp;
          </div>
        </>
      ) : (
        <div className={`${type}-item`} style={{ backgroundColor: color }}>
          &nbsp;
        </div>
      )}

      <div className="label">
        <span>
          <Translate value={text} />
        </span>
      </div>
    </span>
  );
}
