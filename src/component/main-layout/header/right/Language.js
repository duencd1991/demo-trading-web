import React, { Component } from 'react';
import { languages } from '../../../../configs/LanguageConfig';
import { setLocale } from 'react-redux-i18n';
import { connect } from 'react-redux';
import iconUk from '../../../../assets/images/flag/uk.svg';
import iconVi from '../../../../assets/images/flag/vi.png';
import { saveLanguage } from './../../../helpers/Language';
import { changeLanguage } from './../../../app/reducer';
import { getUnique } from './../../../helpers/Common';

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
      language: props.language,
    };
  }

  changeLanguage = language => () => {
    this.props.dispatch(setLocale(language));
    saveLanguage(language);

    changeLanguage(language);
    this.setState({ isShowPopup: false, language });
  };

  toggleShowPopup = isShowPopup => () => {
    this.setState({ isShowPopup });
  };

  renderIcon = () => {
    const { language } = this.state;

    return (
      <span>
        <img alt="" src={language === 'en' ? iconUk : iconVi} />
      </span>
    );
  };

  render() {
    const { isShowPopup } = this.state;

    return (
      <div className="fiidropdown right change-language">
        <a href="javascript:void(0)" className="bor-ts-color-2" onMouseEnter={this.toggleShowPopup(true)}>
          {this.renderIcon()}
        </a>
        <ul className={`dropdown-nav caret ${isShowPopup ? '' : 'hidden'}`}>
          {Object.keys(languages).map((lang, index) => {
            return (
              <li key={getUnique() + index}>
                <a
                  href="javascript:void(0)"
                  onClick={this.changeLanguage(lang)}
                >
                  {languages[lang]}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
  };
};

export default connect(mapStateToProps)(Language);
