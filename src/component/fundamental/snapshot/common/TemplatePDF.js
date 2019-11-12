import React from 'react';
import '../FASnapshot.scss';
import { I18n } from 'react-redux-i18n';

class TemplatePDF extends React.Component {
  render() {
    return (
      <div className="headerAndFooterPdf">
        <div id="headerPDF">
          <div className="headerPDF-logo">
            <div className="brand inline">
              <a href="javascript: void (0)">
                <i className="icon-fiintrade-logo" />
              </a>
            </div>
          </div>
          <div className="headerPDF-title float-left">
            <span>{I18n.t('snapShot.headerPDF')}</span>
          </div>
        </div>
        <div id="Footer">
          <div className="Note">
            <p
              dangerouslySetInnerHTML={{ __html: I18n.t('snapShot.notePDF') }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: I18n.t('snapShot.notePDFGroup2'),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: I18n.t('snapShot.notePDFGroup3'),
              }}
            />
          </div>
          <div className="Footer-text">
            <span style={{ float: 'left' }}>
              {I18n.t('snapShot.footerText')}
            </span>
            <span style={{ float: 'right' }}>
              {I18n.t('snapShot.fiingroup')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TemplatePDF;
