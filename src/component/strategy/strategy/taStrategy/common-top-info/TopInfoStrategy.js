import React from 'react';
import './index.scss';
import Const from './../Const';

class TopInfoStrategy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxTop: false,
      checkboxBottom: false,
      checkboxCrossUp: false,
      checkboxCrossDown: false,
      checkboxDaily: false,
      checkboxMonthly: false,
      checkboxQuarterly: false,
    };
  }

  selectCheckBoxBreakout(refCheckbox) {
    if (refCheckbox === this.checkboxTop) {
      this.setState({
        ...this.state,
        checkboxTop: true,
        checkboxBottom: false,
      });
    } else {
      this.setState({
        ...this.state,
        checkboxTop: false,
        checkboxBottom: true,
      });
    }
  }

  selectCheckBoxBreakoutMa(refCheckbox) {
    if (refCheckbox === this.checkboxCrossUp) {
      this.setState({
        ...this.state,
        checkboxCrossUp: true,
        checkboxCrossDown: false,
      });
    } else {
      this.setState({
        ...this.state,
        checkboxCrossUp: false,
        checkboxCrossDown: true,
      });
    }
  }

  selectCheckBoxAnomaly(refCheckbox) {
    if (refCheckbox === this.checkboxDaily) {
      this.setState({
        ...this.state,
        checkboxDaily: true,
        checkboxMonthly: false,
        checkboxQuarterly: false,
      });
    }
    if (refCheckbox === this.checkboxMonthly) {
      this.setState({
        ...this.state,
        checkboxDaily: false,
        checkboxMonthly: true,
        checkboxQuarterly: false,
      });
    }

    if (refCheckbox === this.checkboxQuarterly) {
      this.setState({
        ...this.state,
        checkboxDaily: false,
        checkboxMonthly: false,
        checkboxQuarterly: true,
      });
    }
  }

  getInfoCheckbox = () => {
    const { currentTab } = this.props;
    const {
      checkboxTop,
      checkboxBottom,
      checkboxCrossUp,
      checkboxCrossDown,
      checkboxDaily,
      checkboxMonthly,
      checkboxQuarterly,
    } = this.state;
    let infoCheckbox = '';
    const map = {
      [Const.tabs.accummulation]: (infoCheckbox = <div />),

      [Const.tabs.breakOut]: (infoCheckbox = (
        <div
          style={{ width: 300, height: 40, display: 'flex', marginLeft: 100 }}
        >
          <div className="checkbox" style={{ width: '20%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check"
              type="checkbox"
              checked={checkboxTop}
              ref={input => (this.checkboxTop = input)}
              onChange={() => this.selectCheckBoxBreakout(this.checkboxTop)}
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check"
            >
              <span className="text-white">Top</span>
            </label>
          </div>

          <div className="checkbox" style={{ width: '20%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check"
              type="checkbox"
              checked={checkboxBottom}
              ref={input => (this.checkboxBottom = input)}
              onChange={() => this.selectCheckBoxBreakout(this.checkboxBottom)}
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check"
            >
              <span className="text-white">Bottom</span>
            </label>
          </div>
        </div>
      )),

      [Const.tabs.breakOutMa]: (infoCheckbox = (
        <div
          style={{ width: 300, height: 40, display: 'flex', marginLeft: 20 }}
        >
          <div className="checkbox" style={{ width: '25%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check"
              type="checkbox"
              checked={checkboxCrossUp}
              ref={input => (this.checkboxCrossUp = input)}
              onChange={() =>
                this.selectCheckBoxBreakoutMa(this.checkboxCrossUp)
              }
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check"
            >
              <span className="text-white">Cross Up</span>
            </label>
          </div>

          <div className="checkbox" style={{ width: '25%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check"
              type="checkbox"
              checked={checkboxCrossDown}
              ref={input => (this.checkboxCrossDown = input)}
              onChange={() =>
                this.selectCheckBoxBreakoutMa(this.checkboxCrossDown)
              }
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check"
            >
              <span className="text-white">Cross Down</span>
            </label>
          </div>
        </div>
      )),

      [Const.tabs.bestInDowntrend]: (infoCheckbox = <div />),

      [Const.tabs.marketAnomaly]: (infoCheckbox = (
        <div
          style={{ width: 300, height: 40, display: 'flex', marginLeft: 50 }}
        >
          <div className="checkbox" style={{ width: '25%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check1"
              type="checkbox"
              checked={checkboxDaily}
              ref={input => (this.checkboxDaily = input)}
              onChange={() => this.selectCheckBoxAnomaly(this.checkboxDaily)}
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check1"
            >
              <span className="text-white">Daily</span>
            </label>
          </div>

          <div className="checkbox" style={{ width: '25%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check2"
              type="checkbox"
              checked={checkboxMonthly}
              ref={input => (this.checkboxMonthly = input)}
              onChange={() => this.selectCheckBoxAnomaly(this.checkboxMonthly)}
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check2"
            >
              <span className="text-white">Monthly</span>
            </label>
          </div>

          <div className="checkbox" style={{ width: '25%' }}>
            <input
              style={{ width: '20%', marginTop: 6 }}
              id="check3"
              type="checkbox"
              checked={checkboxQuarterly}
              ref={input => (this.checkboxQuarterly = input)}
              onChange={() =>
                this.selectCheckBoxAnomaly(this.checkboxQuarterly)
              }
            />
            <label
              style={{ position: 'relative', marginTop: 15 }}
              htmlFor="check3"
            >
              <span className="text-white">Quarterly</span>
            </label>
          </div>
        </div>
      )),
    };

    return map[currentTab];
  };

  render() {
    const { infoStrategy, currentTab } = this.props;
    let infoCheckbox = this.getInfoCheckbox();

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="wrap-strategy-info-strategy">
          <div
            className="box-icon-strategy"
            style={{ backgroundColor: `${infoStrategy.color}` }}
          >
            <a className="label-strategy">{infoStrategy.summaryName}</a>
          </div>
          <div className="box-info-strategy">
            <span className="text-top-line">{infoStrategy.name}</span>
            <span className="text-bot-line">
              {infoStrategy.characteristics}
            </span>
          </div>
        </div>

        {infoCheckbox}
      </div>
    );
  }
}

export default TopInfoStrategy;
