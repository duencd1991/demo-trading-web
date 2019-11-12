import React from 'react';

class CardInfo extends React.Component {
  renderItem = (classNameIconColor, classNameIconName, value, label, key) => {
    return (
      <div key={key}>
        <span className={classNameIconColor}>
          <i className={classNameIconName} />
        </span>
        <strong>{value}</strong>
        <small>&nbsp;{label}</small>
      </div>
    );
  };

  render() {
    const { list } = this.props;

    return (
      <div className="item-card-arrow mt-3">
        {list.map(
          ({ classNameIconColor, classNameIconName, value, label }, index) => {
            return this.renderItem(
              classNameIconColor,
              classNameIconName,
              value,
              label,
              index,
            );
          },
        )}
      </div>
    );
  }
}

export default CardInfo;
