import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import translationHY from '../locales/hy.json';
import translationEN from '../locales/en.json';
import translationRU from '../locales/ru.json';

const resources = {
  hy: {
    translation: translationHY,
  },
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

const languages = Object.keys(resources);

const languageDetector = new LanguageDetector();

languageDetector.addDetector({
  lookup: () => 'hy',
  name: 'defaultDetector',
});

void i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'defaultDetector', 'navigator'],
      lookupLocalStorage: 'lng',
      lookupQuerystring: 'lng',
      lookupCookie: 'lng',
      caches: ['localStorage', 'cookie'],
    },
    supportedLngs: languages,
    fallbackLng: languages,
    keySeparator: false,
    nsSeparator: '|',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }

        return value as string;
      },
    },
  });

export { i18n };

export default i18n;
