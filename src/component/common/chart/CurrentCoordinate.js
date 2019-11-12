import React from 'react';
import PropTypes from 'prop-types';
import CurrentCoordinate from './lib/CurrentCoordinate';

// yellow: rgba(250, 204, 92, 0.15)
// red: rgba(255, 144, 160, 0.15)
// blue: rgba(87, 249, 214, 0.15)

export default Index;

Index.propTypes = {
  yAccessor: PropTypes.func.isRequired,
  color: PropTypes.string,
  field: PropTypes.string,
};

Index.defaultProps = {
  color: 'rgba(87, 249, 214, 0.15)',
  field: null,
};

function Index(props) {
  const { color, yAccessor, field } = props;
  return (
    <>
      <CurrentCoordinate
        field={field}
        yAccessor={yAccessor}
        r={14}
        fill={color}
      />
      <CurrentCoordinate
        field={field}
        yAccessor={yAccessor}
        r={10}
        fill={color}
      />
      <CurrentCoordinate
        field={field}
        yAccessor={yAccessor}
        r={4}
        fill={color}
      />
      <CurrentCoordinate
        field={field}
        yAccessor={yAccessor}
        r={2}
        fill={color}
      />
      <CurrentCoordinate
        field={field}
        yAccessor={yAccessor}
        r={1}
        fill={color}
      />
    </>
  );
}
