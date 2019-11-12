import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer-section">
        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-1 text-right">
            <div className="footer-status">
            <span className="mr-4 text-white-50 p-1">VN Market Closed <span
              className="text-white">15:13:25</span></span>
              <span className="bor-s-color-5 border border-radius-5 text-white btn-border"><i
                className="icon-dot text-s-color-5"/> Connected</span>
              <button type="button" className="mr-2"><i className="icon-fullscreen"/></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
