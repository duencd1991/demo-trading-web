import React, { Component } from 'react';
import Tab from '../../common/tab';
import FADividendAnalysisTable from './FADividendAnalysisTable'
import ExportToCSV from './ExportToCSV';
import Footer from './../../common/table/Footer';

class FADividendTab extends Component {

  render() {
    return (
      <div className="top-nav pt-10">
        <Tab
          currentTab={1}
          listTab='cashDividend.listTab'
          isLineLinkLeft={true}
        />
        <div className="tab-content">
          <ExportToCSV/>
          <FADividendAnalysisTable/>
        </div>
        <Footer
          appendStyle={{ margin: '10px 0' }}
          listTextLang={[
            {
              text: 'cashDividend.disclaimer',
              style: { fontWeight: 'normal' }
            },
            {
              text: 'cashDividend.disclaimerContent',
            }
          ]}/>
      </div>
    );
  }
}

export default FADividendTab;
