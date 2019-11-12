import React, { PureComponent } from 'react';
import { Translate } from 'react-redux-i18n';

class FACheckupFooter extends PureComponent {

  render() {
    return (
      <div className="footer-table-fa-checkup row">
        <div className="circle-dot row">
          <div className="circle circle-excellent"/>
          <Translate value="financialAnalysis.faCheckupFooter.excellent"/>
        </div>

        <div className="circle-dot row">
          <div className="circle circle-good"/>
          <Translate value="financialAnalysis.faCheckupFooter.good"/>
        </div>

        <div className="circle-dot row">
          <div className="circle circle-neutral"/>
          <Translate value="financialAnalysis.faCheckupFooter.neutral"/>
        </div>

        <div className="circle-dot row">
          <div className="circle circle-be-alert"/>
          <Translate value="financialAnalysis.faCheckupFooter.beAlert"/>
        </div>

        <div className="circle-dot row">
          <div className="circle circle-watch-out"/>
          <Translate value="financialAnalysis.faCheckupFooter.watchOut"/>
        </div>

      </div>
    );
  }
}

export default FACheckupFooter;
