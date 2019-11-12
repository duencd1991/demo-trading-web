import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class TextBlinkCustom extends PureComponent {
  constructor(props) {
		super(props)
		this.state = {
			isUpdate: false,
    }
    this.isChanging = false
    // changing flag
	}
  
	componentWillReceiveProps(nextProps) {
    const {data, compareKey } = this.props
    const currentData = data[compareKey]
    const nextData = nextProps.data[compareKey]
		if (currentData !== nextData && !this.isChanging) {
      this.isChanging = true
      // if data updated when text blink => return
			this.setState({ isUpdate: true }, () => {
				return this.timeOutId = setTimeout(() => {
					this.setState({isUpdate: false}, () => {
            this.isChanging = false
          });
				}, 1000)
			})
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeOutId);
	}

  render() {
    const { children } = this.props;
    const { isUpdate } = this.state
    const blinkClass = isUpdate ? 'blink-me' : ''
    
    return (
      <div className={`${blinkClass}`}>
        {children || ''}
      </div>
    );
  }
}

TextBlinkCustom.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  compareKey: PropTypes.string
};

TextBlinkCustom.defaultProps = {
  className: 'text-blink',
  data: {}
};

export default TextBlinkCustom;
