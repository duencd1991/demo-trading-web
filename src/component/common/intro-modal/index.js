import './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

import { toggleIntro } from '../../app/reducer';
import Modal from './Modal';
import CommonModal from './CommonModal';

class IntroModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: false,
      steps: [
        {
          content: (
            <div className="intro-modal-wrapper">
              <CommonModal totalStep={4} currentStep={1} title="tuan anh" />
            </div>
          ),
          placement: 'auto',
          styles: {
            options: {
              width: 900,
            },
          },
          target: '#menu-tutorial',
          title: 'Our projects',
        },
        {
          title: 'Our Mission',
          content: (
            <div>
              You can render anything here.
              <br />
              <h3>Like a H3 title</h3>
            </div>
          ),
          target: '#workspace-tutorial',
          placement: 'auto',
        },
        {
          title: 'Our Fail Test',
          content: 'This step should fail',
          target: '#quick-component-tutorial',
          placement: 'auto',
        },
        {
          title: 'Our Fail Test',
          content: 'This step should fail',
          target: '#setting-tutorial',
          placement: 'auto',
        },
      ],
      stepIndex: 0, // a controlled tour
    };
  }

  handelStartIntro = e => {
    e.preventDefault();
    const { toggleIntro } = this.props;
    this.setState({ run: true });
    toggleIntro(false);
  };

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { action, index, status, type } = data;

    console.log(index);

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }

    if (type === EVENTS.TOUR_END && this.state.run) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false, stepIndex: 0 });
    }

    if (typeof joyride.callback === 'function') {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  // onClickNext = () => {
  //   this.setState(prevState =>{
  //     return {
  //       stepIndex: prevState.stepIndex + 1,
  //     }
  //   })
  // }

  // onClickBack = () => {
  //   this.setState(prevState =>{
  //     return {
  //       stepIndex: prevState.stepIndex +- 1,
  //     }
  //   })
  // }

  // onClickSkip = () => {
  //   this.setState({
  //     stepIndex: 1,
  //     run: false,
  //   })
  // }

  render() {
    const { isShowIntro } = this.props;
    const { run, steps, stepIndex } = this.state;
    console.log(stepIndex);
    return (
      <>
        {/* <button style={{ position: 'absolute', top: 0, height: 100}} onClick={ this.text}>CLICKKKKKKKKKKKKK</button> */}
        <ReactJoyride
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          stepIndex={stepIndex}
          run={run}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
          callback={this.handleJoyrideCallback}
        />

        {isShowIntro && (
          <div className="intro-modal-wrapper">
            <Modal handelStartIntro={this.handelStartIntro} />
          </div>
        )}
      </>
    );
  }
}

IntroModal.propTypes = {
  joyride: PropTypes.shape({
    callback: PropTypes.func,
  }),
};

IntroModal.defaultProps = {
  joyride: {},
};

const mapDispatchToProps = {
  toggleIntro,
};

const mapStateToProps = state => {
  return {
    isShowIntro: state.isShowIntro,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IntroModal);
