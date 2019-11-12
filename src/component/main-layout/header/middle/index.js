import React from 'react';
import QuickAccess from './QuickAccess';
import Search from './Search';
import NotifiMaque from './notifi-maque/NotifiMaque';

export default function() {
  return (
    <div className="top-middle float-left">
      <div className="">
        <QuickAccess />
        <div className="">
          <div className="search-and-maque">
            <Search />
            <NotifiMaque />
          </div>
        </div>
      </div>
    </div>
  );
}
