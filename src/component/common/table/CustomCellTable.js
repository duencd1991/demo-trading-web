import { formatTextFloat } from '../../helpers/Text';
import React from 'react';

export { cellTable, cellNegtiveRed };

function cellTable(original) {
  return original >= 0 ? (
    <div className="text-s-color-5" style={{ textAlign: 'right' }}>
      {formatTextFloat(original)} %
    </div>
  ) : (
    <div className="text-s-color-3" style={{ textAlign: 'right' }}>
      {formatTextFloat(original)} %
    </div>
  );
}

function cellNegtiveRed(original, digits) {
  if (Number(original)) {
    return original >= 0 ? (
      <div>{formatTextFloat(original, digits)}</div>
    ) : (
      <div className="text-s-color-3">{formatTextFloat(original, digits)}</div>
    );
  } else {
    return <div>{formatTextFloat(original, digits)}</div>;
  }
}
