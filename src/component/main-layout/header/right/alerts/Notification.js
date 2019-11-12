import React, { Component } from 'react';
import ScrollComponent from '../../../../common/ScrollComponent';
import './index.scss';

class Notification extends Component {
  render() {
    const message = 'HPG: appears pattern Big Gap Down signal...';
    return (
      <div className="fiidropdown right notifi-all">
        <a href="javascript:void(0)" className="bor-ts-color-2">
          <span className="bg-bor-sp">
            <i className="icon-bell" />
            <span className="notifi-dot" />
          </span>
        </a>
        <ul className="dropdown-nav caret ">
          <li className="li-header">
            <div className="header-drop-notis p-8 d-flex justify-content-between">
              <span> Notification </span>
              <div className="header-drop-notis-right d-flex ">
                <a className="mr-5"> Mark All as Read</a>
                <a> Settings </a>
              </div>
            </div>
          </li>
          <li className="header-drop-notis   dropdown-alert-content">
            <ScrollComponent>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
              <div className="d-flex w-100 align-content-stretch li-alert-content">
                <div className="alert-img d-flex mr-5 align-items-center justify-content-center">
                  {' '}
                  HPG{' '}
                </div>
                <div className="alert-content d-flex flex-column">
                  <div className=" d-flex justify-content-between ">
                    <span className="alert-title"> Revenue Rise Suddenly </span>
                    <span className="alert-time"> 4 minutes ago </span>
                  </div>
                  <span className="alert-mess"> {message} </span>
                </div>
              </div>
            </ScrollComponent>
          </li>
        </ul>
      </div>
    );
  }
}

export default Notification;
