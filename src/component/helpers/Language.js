import { defaultLanguage } from '../../configs/LanguageConfig';

const KEY_LANGUAGE = 'language';

export { getLanguage, saveLanguage };

function getLanguage() {
  return localStorage.getItem(KEY_LANGUAGE) || defaultLanguage;
}

function saveLanguage(lang) {
  localStorage.setItem(KEY_LANGUAGE, lang);
}
