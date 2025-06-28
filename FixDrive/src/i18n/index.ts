import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en.json';
import ru from './ru.json';
import tr from './tr.json';
import es from './es.json';
import de from './de.json';
import fr from './fr.json';
import ar from './ar.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      tr: { translation: tr },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 