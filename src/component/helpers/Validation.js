import { isEmpty } from 'lodash';
import { I18n } from 'react-redux-i18n';

class Validation {
  messages = [];

  constructor(str) {
    this.str = this.format(str);
  }

  format = str => {
    return str.trim();
  };

  isEmpty = () => {
    if (isEmpty(this.str)) {
      this.messages.push(I18n.t('message.validate.empty'));
    }
    return this;
  };

  startWithAlphabetOrNumber = () => {
    const letters = /^[A-Za-z0-9]/;
    if (!this.str.match(letters)) {
      this.messages.push(I18n.t('message.validate.startWithAlphabetOrNumber'));
    }
    return this;
  };

  // onlyLatinWithSpecialCharacter = () => {
  //   const letters = /^[A-Za-z0-9!@#$%^&*]+$/;
  //   if (!this.str.match(letters)) {
  //     this.messages.push(I18n.t('message.validate.onlyLatinWithSpecialCharacter'));
  //   }
  //   return this;
  // };

  limitCharacter = count => {
    if (this.str.length > count) {
      this.messages.push(I18n.t('message.validate.limitCharacter', { count }));
    }
    return this;
  };

  check = () => {
    this.isEmpty()
      .startWithAlphabetOrNumber()
      // .onlyLatinWithSpecialCharacter()
      .limitCharacter(50);

    return this;
  };
}

export default Validation;
