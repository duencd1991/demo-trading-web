import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../common/table/Table';
import Const from '../Const';
import { includes } from 'lodash';
import { formatDate } from '../../../helpers/DateTime';
import {
  formatTextFloat,
  formatPrice,
  formatPercent,
} from '../../../helpers/Text';
import withScroll from './../../../common/withScroll';
import { REDUCER_NAME } from './../reducer';
import { compose } from 'redux';
import TooltipMajorShareHolder from './tooltip/TooltipMajorShareHolders';
import TooltipBod from './tooltip/TooltipBoD';
import { COMPONENT_RESIZE } from '../../../common/GoldenLayoutWrapper';

class TableOwnerShip extends React.Component {
  state = {
    bottom: null,
  };

  tableRef = React.createRef();

  componentDidMount() {
    this.calcBottom();
    window.addEventListener(COMPONENT_RESIZE, this.calcBottom);
  }

  componentWillUnmount() {
    window.removeEventListener(COMPONENT_RESIZE, this.calcBottom);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title && nextProps.schemaKey) {
      this.calcBottom();
    }
  }

  calcBottom = () => {
    if (!this.tableRef.current.closest('.lm_stack')) {
      return;
    }
    const bottom = this.tableRef.current
      .closest('.lm_stack')
      .getBoundingClientRect().bottom;
    this.setState({
      bottom,
    });
  };

  getDataFromRedux = () => {
    const { indexSelectTab, id } = this.props;
    if (indexSelectTab === Const.listTab.BoardOfDirectors.Index) {
      return state =>
        state[REDUCER_NAME].listMultiComponent[id].listBoardOfDirectorById;
    }
    return state =>
      state[REDUCER_NAME].listMultiComponent[id].listMajorShareHolderById;
  };

  getIds = () => {
    const {
      indexSelectTab,
      listBoardOfDirectorId,
      listMajorShareHolderId,
    } = this.props;
    if (indexSelectTab === Const.listTab.BoardOfDirectors.Index) {
      return listBoardOfDirectorId;
    }
    return listMajorShareHolderId;
  };

  getSchema = () => {
    const { bottom } = this.state;
    const ZERO_VALUE = 0;
    const { title: tabTitle, schemaKey, code, height, id } = this.props;

    return Object.keys(schemaKey).map((item, index) => {
      const key = schemaKey[item];
      const title = `${tabTitle}.${item}`;
      const result = {
        key,
        title,
      };

      if (includes([Const.listTitleTableMajorShareHolders.NAME], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            return (
              <div className="text-left" style={{ fontWeight: 'normal' }}>
                <TooltipMajorShareHolder
                  code={item.shareHolderCode}
                  id={id}
                  bottom={bottom}
                  shareHolderName={item.shareHolderName}
                >
                  {text}
                </TooltipMajorShareHolder>
              </div>
            );
          },
        };
      }

      if (includes([Const.listTitleTableBOD.NAME], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            let styleDiv = {};
            if (item.isRelationship) {
              styleDiv = {
                fontStyle: 'italic',
                width: 150,
                fontWeight: 'normal',
              };
            } else {
              styleDiv = { width: 150, fontWeight: 'normal' };
            }
            return (
              <div className="text-left">
                <TooltipBod
                  code={code}
                  personId={item.personId}
                  fullName={item.fullName}
                  id={id}
                  bottom={bottom}
                >
                  <span className="text-truncate" style={styleDiv}>
                    {text}
                  </span>
                </TooltipBod>
              </div>
            );
          },
        };
      }

      if (
        includes(
          [
            Const.listTitleTableMajorShareHolders.PUBLIC_DATE,
            Const.listTitleTableBOD.PUBLIC_DATE,
          ],
          key,
        )
      ) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            return (
              <div className="text-left font-weight-light">
                {formatDate(text)}
              </div>
            );
          },
        };
      }

      if (includes([Const.listTitleTableBOD.POSITION], key)) {
        return {
          ...result,
          thStyle: { textAlign: 'left' },
          render: (text, item) => {
            if (item.isRelationship) {
              return (
                <div
                  className="text-left text-truncate"
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  {text}
                </div>
              );
            }
            return <div className="text-left text-truncate">{text}</div>;
          },
        };
      }

      if (
        includes(
          [
            Const.listTitleTableBOD.PERCENTAGE,
            Const.listTitleTableMajorShareHolders.PERCENTAGE,
          ],
          key,
        )
      ) {
        return {
          ...result,
          render: (text, item) => {
            if (text === 0) {
              return <span>{'--'}</span>;
            }
            return formatPercent(formatTextFloat(text)) + '%';
          },
        };
      }

      if (
        includes(
          [
            Const.listTitleTableBOD.SHARES,
            Const.listTitleTableMajorShareHolders.SHARES,
          ],
          key,
        )
      ) {
        return {
          ...result,
          render: (text, item) => {
            if (text === ZERO_VALUE) {
              return <span>{'--'}</span>;
            }
            return formatTextFloat(formatPrice(text));
          },
        };
      }

      return {
        ...result,
        render: text => text,
      };
    });
  };

  render() {
    const { height } = this.props;
    return (
      <div ref={this.tableRef}>
        <Table
          table={{ height }}
          thValign="top"
          ids={this.getIds()}
          resizable={true}
          columnDraggable={false}
          rowDraggable={false}
          getDataFromRedux={this.getDataFromRedux()}
          schema={this.getSchema()}
          stickyFirstColumn={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    listBoardOfDirectorId:
      state[REDUCER_NAME].listMultiComponent[id].listBoardOfDirectorId,
    listMajorShareHolderId:
      state[REDUCER_NAME].listMultiComponent[id].listMajorShareHolderId,
    code: state[REDUCER_NAME].listMultiComponent[id].currentSearch.code,
    listBoardOfDirectorById:
      state[REDUCER_NAME].listMultiComponent[id].listBoardOfDirectorById,
  };
};

const enhance = compose(
  withScroll(160, REDUCER_NAME),
  connect(mapStateToProps),
);

export default enhance(TableOwnerShip);
