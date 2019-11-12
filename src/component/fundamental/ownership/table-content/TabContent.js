import React from 'react';
import Const from '../Const';
import TableOwnerShip from './Table';
import SizeTracker from '../../../common/size-tracker/SizeTracker';

class TabContent extends React.Component {
  getSchemaKey = () => {
    const { indexSelectTab } = this.props;
    const map = {
      [Const.table.marjorShareHolders]: Const.listTitleTableMajorShareHolders,
      [Const.table.boardOfDirectors]: Const.listTitleTableBOD,
    };
    return map[indexSelectTab];
  };

  getTableTitle = () => {
    const { indexSelectTab } = this.props;
    const map = {
      [Const.table.marjorShareHolders]:
        'ownerShip.listTitleTableMajorShareHolders',
      [Const.table.boardOfDirectors]: 'ownerShip.listTitleTableBOD',
    };
    return map[indexSelectTab];
  };

  render() {
    const { id } = this.props;
    return (
      <SizeTracker className="body-tab-content flex-fill">
        {(width, height) => (
          <TableOwnerShip
            height={height}
            title={this.getTableTitle()}
            schemaKey={this.getSchemaKey()}
            indexSelectTab={this.props.indexSelectTab}
            id={id}
          />
        )}
      </SizeTracker>
    );
  }
}

export default TabContent;
