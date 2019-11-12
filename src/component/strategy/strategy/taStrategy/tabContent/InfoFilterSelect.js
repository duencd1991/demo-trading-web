import React from 'react';
import Const from '../Const';
import './index.scss';

const spencialLengthCondition = 3;

class TabContent extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     infoTypeFilterLineOne: '>5 days',
  //     infoTypeFilterLineTwo: 'a volume rate of change >2',
  //     infoTypeFilterLineThree: 'a price increase >5%',
  //   };
  // }

  render() {
    const { infoFilterTab, infoFilterTabDefault } = this.props;

    let conditionLastedText = '';
    if (
      infoFilterTabDefault.length > spencialLengthCondition &&
      infoFilterTab.length > spencialLengthCondition
    ) {
      conditionLastedText = (
        <>
          <span className="mid-condition-style">{` ${
            infoFilterTabDefault[3]
          }`}</span>{' '}
          <span className="last-condition-style">{`${infoFilterTab[3]}`}</span>
        </>
      );
    }

    return (
      <>
        <span className="first-condition-style">{`Condition :`}</span>
        <span className="mid-condition-style">{` ${
          infoFilterTabDefault[0]
        }`}</span>{' '}
        <span className="last-condition-style">{`${infoFilterTab[0]}`}</span>
        <span className="mid-condition-style">{` ${
          infoFilterTabDefault[1]
        }`}</span>{' '}
        <span className="last-condition-style">{`${infoFilterTab[1]}`}</span>
        <span className="mid-condition-style">{` ${
          infoFilterTabDefault[2]
        }`}</span>{' '}
        <span className="last-condition-style">{`${infoFilterTab[2]}`}</span>
        {conditionLastedText}
      </>
    );
  }
}

export default TabContent;
