import React from 'react';


class SearchBox extends React.Component {
  render() {
    const { handleChangeInput } = this.props;

    return (
      <div className="search-box mt-2">
        <input className="search-input" type="search" placeholder="Search" onChange={handleChangeInput}/>
        <button type="submit"><i className="icon-search"/></button>
      </div>
    );
  }
}

export default SearchBox;
