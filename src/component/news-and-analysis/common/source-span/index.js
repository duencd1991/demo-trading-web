import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import { REDUCER_NAME, setFilterCondition } from '../../reducer';
import Const from '../../Const';

const KEY_VALUE = {
  1: Const.NewsAggregatorTable.SOURCE,
  2: Const.AutoNewsTable.TYPE,
  3: null,
  4: {
    1: Const.MostRecentTable.CONTRIBUTOR,
    2: Const.MostPopularTable.CONTRIBUTOR,
    3: '',
    4: '',
  },
};

const SOURCE_COLOR = {
  High: 'bg-s-color-3',
  Medium: 'bg-s-color-4',
  Low: 'bg-l-color-3',
};
class SourceSpan extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isShowPopup: false,
      listCheckBox: [
        {
          id: 1,
          title: 'Sort Tag',
          name: this.props.text,
          checked: false,
        },
        {
          id: 2,
          title: 'Show All',
          name: 'getAll',
          checked: false,
        },
      ],
    };
    this.state = this.initialState;
  }

  toggleShowPopup = isShowPopup => {
    if (this.state.isShowPopup !== isShowPopup) {
      this.setState({ ...this.state, isShowPopup });
    }
    if (!isShowPopup) this.setState({ ...this.initialState });
  };

  handleClickOutside = () => {
    if (this.state.isShowPopup) {
      this.toggleShowPopup(false);
    }
  };

  handleFilter = (key, value) => {
    const { setFilterCondition, currentTab, currentChildTab } = this.props;
    setFilterCondition(
      { parentTab: currentTab, childTab: currentChildTab },
      { key, value },
    );
  };

  handleClickCheckBox = index => {
    const { currentTab, currentChildTab } = this.props;
    const listCheckBoxUpdated = [...this.state.listCheckBox];
    const item = listCheckBoxUpdated[index - 1];
    const keyValue =
      currentTab !== 4
        ? KEY_VALUE[currentTab]
        : KEY_VALUE[currentTab][currentChildTab];
    const key = keyValue;
    const value = index - 1 === 0 ? item.name : null;
    this.handleFilter(key, value);

    const test = listCheckBoxUpdated.map(item => {
      if (item.id === index) {
        return { ...item, checked: true };
      }
      return { ...item, checked: false };
    });

    this.setState({ listCheckBox: test });
  };

  render() {
    const { text, type = '' } = this.props;
    const optionalClassName = SOURCE_COLOR[text];
    const { isShowPopup, listCheckBox } = this.state;
    const classNamePopup = isShowPopup ? 'dropdown-menu show' : 'dropdown-menu';
    return (
      <div className="group-action-ticker">
        <div className="item-btn" style={{ opacity: 'unset' }}>
          <div className="dropdown">
            <span
              className={`btn-label-cus text-center ${optionalClassName}`}
              style={{
                cursor: 'pointer',
                width: 60,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
              onClick={() => this.toggleShowPopup(true)}
              aria-haspopup="true"
              aria-expanded="false"
              title={text}
            >
              {text}
            </span>
            {type !== 'pa' && type !== 'r' && (
              <>
                <div
                  className={classNamePopup}
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    position: 'absolute',
                    transform: 'translate3d(5px, 15px, 0px)',
                    background: '#232931',
                    top: '-20px',
                    left: '-100px',
                    willChange: 'transform',
                    cursor: 'pointer',
                    minWidth: 90,
                    border: 'solid 0.5px #555555',
                  }}
                >
                  <div className="list-check">
                    {listCheckBox.map((item, index) => (
                      <div key={`checkbox-${index}`} className="checkbox">
                        <input
                          checked={item.checked}
                          onChange={() => this.handleClickCheckBox(item.id)}
                          id={`checkbox-${index}`}
                          type="checkbox"
                          style={{ cursor: 'pointer' }}
                        />
                        <label
                          htmlFor={`checkbox-${index}`}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: state[REDUCER_NAME].currentTab,
  currentChildTab: state[REDUCER_NAME].currentChildTab,
});

const mapDispatchToProps = dispatch => {
  return {
    setFilterCondition: (tabType, tabNumber) =>
      dispatch(setFilterCondition(tabType, tabNumber)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(enhanceWithClickOutside(SourceSpan));
