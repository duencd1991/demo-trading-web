import React from 'react';
import { connect } from 'react-redux';
import {
  deleteScreener,
  updateScreener,
  saveScreener,
  changeScreener,
} from '../reducer';
import ScreenerItem from './ScreenerItem';
import ScrollComponent from '../../../common/ScrollComponent';

class ListScreener extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      listScreener,
      editAction,
      deleteAction,
      isTopScreener,
      changeScreener,
      showHide,
    } = this.props;

    return (
      <div
        className="my-screeners"
        style={{
          position: 'absolute',
          transform: 'translate3d(-110px, 20px, 0px)',
          top: '20%',
          left: '0%',
          willChange: 'transform',
        }}
      >
        <ScrollComponent appendStyle={{ maxHeight: 210 }}>
          <div className="myscreener-content">
            {listScreener &&
              listScreener.map((value, index) => {
                return (
                  <ScreenerItem
                    showHide={showHide}
                    key={index}
                    screener={value}
                    editAction={editAction}
                    deleteAction={deleteAction}
                    changeScreener={changeScreener}
                    isTopScreener={isTopScreener}
                  />
                );
              })}
          </div>
        </ScrollComponent>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteAction: id => dispatch(deleteScreener(id)),
  editAction: (id, name) => dispatch(updateScreener(id, name)),
  changeScreener: (id, isTopScreener) =>
    dispatch(changeScreener(id, isTopScreener)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ListScreener);
