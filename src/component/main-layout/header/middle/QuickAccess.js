import React, { Component } from 'react';

class QuickAccess extends Component {
  render() {
    return (
      <div className="">
        <div className="quick-ac-com mt-05">
          <ul className="">
            <li>
              <a href="#">
                <span>
                  <i className="icon-calenda fs-12" />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="icon-search1 fs-12" />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="icon-date fs-12" />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="icon-money fs-12" />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="icon-clock fs-12" />
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i
                    id="quick-component-tutorial"
                    className="icon-more fs-12"
                  />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default QuickAccess;
