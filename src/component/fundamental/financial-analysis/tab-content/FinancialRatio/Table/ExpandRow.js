import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

// const Plus = require('../../../../../assets/images/svg/fundamental/plus.svg');
// const Minus = require('../../../../../assets/images/svg/fundamental/minus.svg');
// const PlusBlack = require('../../../../../assets/images/svg/fundamental/plus_black.svg');
// const MinusBlack = require('../../../../../assets/images/svg/fundamental/minus_black.svg');
import './index.scss';
import Plus from '../../../../../../assets/images/svg/fundamental/plus.svg';
import Minus from '../../../../../../assets/images/svg/fundamental/minus.svg';
import PlusLight from '../../../../../../assets/images/svg/fundamental/plus_black.svg';
import MinusLight from '../../../../../../assets/images/svg/fundamental/minus_black.svg';

class ExpandRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: true,
    };
  }
  handleOnclick = () => {
    this.setState(({ isExpand }) => {
      return { isExpand: isExpand ? false : true };
    });
  };

  getSrc = (isExpand, theme) => {
    if (isExpand) {
      if (theme === 'dark') return Minus;
      return MinusLight;
    }
    if (theme === 'dark') return Plus;
    return PlusLight;
  };

  render() {
    const { value, theme } = this.props;
    const { isExpand } = this.state;
    const src = this.getSrc(isExpand, theme);
    const img = (
      <img style={{ width: 11, marginRight: 4 }} src={src} alt="status" />
    );

    return (
      <div
        className="expand-row-wrapper"
        onClick={this.handleOnclick}
        style={{ fontWeight: 300 }}
      >
        {img}
        {value}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  i18n: state.i18n,
  theme: state.theme,
});

export default connect(mapStateToProps)(ExpandRow);
