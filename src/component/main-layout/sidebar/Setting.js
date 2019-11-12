import React from 'react';

class Setting extends React.Component {
  getPercentZoom = (newFontSize, fontSize = 12) => {
    return (newFontSize * 100) / fontSize;
  };

  changeSize = () => {
    document.body.style.zoom = `${this.getPercentZoom(14)}%`;
    window.dispatchEvent(new Event('resize'));
  };

  render() {
    return (
      <li onClick={this.changeSize}>
        <a href="javascript:void(0)">
          <i id="setting-tutorial" className="icon-settings" />
        </a>
      </li>
    );
  }
}

export default Setting;
