import React from 'react';
import DragPopup from './drag-popup/DragPopup';
import Header from './header';
import SideBar from './sidebar';
//TODO import Footer from './footer';
import { SaveLayoutPopup } from './sidebar/save-layout';

export default function (props) {
  return (
    <div className="container-fluid">
      <header className="fiintrade-header pt-3">
        <Header />
      </header>
      <div className="fiintrade-leftsidebar">
        <SideBar {...props} />
      </div>
      <div role="main" className="fiintrade-main">
        <SaveLayoutPopup />
        {props.children}
        <DragPopup />
      </div>
        {/*
      <footer className="fiintrade-footer">
        <Footer />
      </footer>
       */}
    </div>
  );
}
