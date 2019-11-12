import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
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
    const { setFilterNewValue } = this.props;
    setFilterNewValue(key, value);
  };

  handleClickCheckBox = index => {
    const listCheckBoxUpdated = [...this.state.listCheckBox];
    const item = listCheckBoxUpdated[index - 1];
    const key = index - 1 === 0 ? 'sourceCode' : null;
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
    const { text } = this.props;
    const { isShowPopup, listCheckBox } = this.state;
    const classNamePopup = isShowPopup ? 'dropdown-menu show' : 'dropdown-menu';
    return (
      <div className="group-action-ticker">
        <div className="item-btn" style={{ opacity: 'unset' }}>
          <div className="dropdown">
            <span
              className={`btn-label-cus text-center`}
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
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(SourceSpan);
