import React from 'react';
import Left from './left';
import Middle from './middle';
import Right from './right';

export default function () {
  return (
    <div className="header-section">
      <div className="">
        <Left/>
        <Middle/>
        <Right/>
      </div>
    </div>
  );
}
