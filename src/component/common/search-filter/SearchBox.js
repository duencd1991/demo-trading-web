import React from 'react';
import calculateSize from 'calculate-size';

const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_ENTER = 13;
const MAX_LENG_SEARCH_BOX = 200;

const listIndexName = {
  vnIndex: 'VNINDEX',
  hnIndex: 'HNXIndex',
  upcomIndex: 'UpcomIndex',
};

class SearchBox extends React.Component {
  handleKeyDown = event => {
    const { scrollView, enterKeyBoard } = this.props;

    switch (event.keyCode) {
      case KEY_ENTER:
        enterKeyBoard();
        break;
      case KEY_UP:
        scrollView(-1);
        break;
      case KEY_DOWN:
        scrollView(1);
        break;
      default:
    }
  };

  getMaxWidthTextInSearchBox = (
    isShowDropDown,
    isShowSmallInfoTicker,
    text,
  ) => {
    const size = calculateSize(text, {
      font: 'Arial',
      fontSize: '18px',
      fontWeight: 'bold',
    });
    let textWidth = '';
    if (isShowSmallInfoTicker) {
      if (isShowDropDown) {
        textWidth = MAX_LENG_SEARCH_BOX;
      } else {
        textWidth = size.width + 5;
      }
    }
    return textWidth;
  };

  contextMenu = e => {
    e.preventDefault();
    this.props.inputRef.current.blur();
  };

  render() {
    const {
      textSearch,
      mainSearch,
      handleChange,
      clickSearchBox,
      inputRef,
      tickerNameAndExchange,
      isShowDropDown,
      isShowSmallInfoTicker,
    } = this.props;

    // console.log('text search : ', mainSearch)
    let smallInfoTicker = '';
    if (isShowSmallInfoTicker) {
      if (!isShowDropDown) {
        let maxWidthTicker = this.getMaxWidthTextInSearchBox(
          false,
          isShowSmallInfoTicker,
          textSearch,
        );
        let maxWidthTickerNameExchange = MAX_LENG_SEARCH_BOX - maxWidthTicker;

        if (
          mainSearch === listIndexName.vnIndex ||
          mainSearch === listIndexName.hnIndex ||
          mainSearch === listIndexName.upcomIndex
        ) {
          smallInfoTicker = (
            <input
              className="input-search-custome"
              onChange={e => handleChange(e.target.value)}
              style={{
                width: maxWidthTickerNameExchange,
              }}
              onFocus={() => {
                this.props.inputRef.current.focus();
              }}
              onClick={clickSearchBox}
              onContextMenu={clickSearchBox}
            />
          );
        } else {
          smallInfoTicker = (
            <input
              className="input-search-custome search-box-small-text text-truncate reset-padding custom-padding-2"
              onFocus={() => {
                this.props.inputRef.current.focus();
              }}
              style={{
                width: maxWidthTickerNameExchange,
              }}
              value={tickerNameAndExchange}
              onClick={clickSearchBox}
              onChange={e => handleChange(e.target.value)}
              onContextMenu={clickSearchBox}
              // readOnly
            />
          );
        }
      }
    }

    return (
      <div className="d-flex">
        <input
          ref={inputRef}
          type="search"
          className="input-search-custome reset-padding custom-padding"
          style={{
            width: this.getMaxWidthTextInSearchBox(
              isShowDropDown,
              isShowSmallInfoTicker,
              textSearch,
            ),
            float: 'left',
            padding: '0px !important',
          }}
          value={textSearch}
          onChange={e => handleChange(e.target.value)}
          onClick={clickSearchBox}
          onKeyDown={this.handleKeyDown}
          onContextMenu={clickSearchBox}
          // onSelect={clickSearchBox}
          // readOnly
        />
        {smallInfoTicker}
      </div>
    );
  }
}

export default SearchBox;
