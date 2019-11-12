import Slider from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class CustomRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowCross: false,
      value: this.props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = this.props;
    if (defaultValue !== nextProps.defaultValue) {
      this.setState({
        value: nextProps.defaultValue,
      });
    }
  }

  onSliderChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  };

  render() {
    const { value } = this.state;
    const { min, max, step, tipFormatter } = this.props;
    return (
      <Range
        allowCross={this.state.allowCross}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={this.onSliderChange}
        tipFormatter={tipFormatter}
      />
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
});

export default connect(mapStateToProps)(CustomRange);
