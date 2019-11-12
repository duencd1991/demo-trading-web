import React from 'react';

class VolumeInfo extends React.Component {
  renderItem = (label, value, key) => {
    return (
      <div className="item-total-volume mt-1" key={key}>
        {label}
        <span>{value}</span>
      </div>
    );
  };
  render() {
    const { list } = this.props;

    return list.map(({ label, value }, index) => {
      return this.renderItem(label, value, index);
    });
  }
}

export default VolumeInfo;
