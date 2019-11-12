import React from 'react';
import SearchBox from './common/SearchBox';
import PriceInfo from './PriceInfo';
import ScoreBox from './Score';
import GroupButton from '../common/header/group-button';
import Noti from './Noti';
import { Export } from '../../common/export';
import Const from './Const';
import { I18n } from 'react-redux-i18n';

class FAHead extends React.Component {
  render() {
    const { id, dragCode } = this.props;
    const idFormExport = 'fa-snapshot-export' + id;

    return (
      <div className="fa-top-content top-nav flex-column h-100">
        <div className="d-flex mb-10 justify-content-between align-items-end">
          <div id="search-score" className="d-flex align-items-center">
            <div className="d-flex flex-column mr-20">
              <SearchBox />
              <PriceInfo dragCode={dragCode} />
            </div>
            <ScoreBox dragCode={dragCode} />
            <GroupButton />
            <Noti />
          </div>
          <Export
            exportId={idFormExport}
            exportName="fa-snapShot-content.png"
            exportConfigs={Const.exportConfigs}
            title={I18n.t('snapShot.titleButtonPrint')}
          />
        </div>
      </div>
    );
  }
}

export default FAHead;
