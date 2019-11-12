import React from 'react';

class PieSVG extends React.Component {
  render() {
    const { data, colors } = this.props;
    let titleLegend = '';
    if (data.data.item1) {
      titleLegend =
        data.data.item1.length > 10
          ? `${data.data.item1.substring(0, 10)}...`
          : data.data.item1;
    }

    const key = data.index;
    return (
      <div className="div-wrap-legend">
        <li
          title={data.data.item1}
          style={{
            display: 'inline-flex',
            listStyle: 'none',
            alignItems: 'center',
            lineHeight: 1,
          }}
          key={key}
        >
          <div
            style={{
              backgroundColor: colors[key],
              flexShrink: 0,
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <div className="legend-title text-truncate">{titleLegend}</div>
        </li>
      </div>
    );
  }
}

export default PieSVG;
