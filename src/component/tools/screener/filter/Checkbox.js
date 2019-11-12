import React, { PureComponent } from 'react';

class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      selectedValue: this.props.selectedValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ check: nextProps.selectedValue });
  }

  checkChange() {
    const { onChange, param } = this.props;
    onChange(!this.state.check, param);
    this.setState({ check: !this.state.check });
  }

  render() {
    const { param } = this.props;
    const { check } = this.state;
    return (
      <div className="screener-checkbox d-flex checkbox">
        <span>{param.name} </span>
        <div>
          <input
            id="checkbox"
            type="checkbox"
            checked={check}
            onChange={() => this.checkChange(check)}
            style={{ width: '60px', marginLeft: '-60px' }}
          />
          <label htmlFor="checkbox" style={{ position: 'inherit' }}>
            <span className="text-white" />
          </label>
        </div>
      </div>
    );
  }
}
export default Checkbox;
