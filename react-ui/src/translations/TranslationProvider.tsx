import { createInstance } from 'i18next';
import React, { createContext, ReactNode, useCallback } from 'react';
import { I18nextProvider } from 'react-i18next';
import english from './en/translation.json';
import finnish from './fi/translation.json';
import swedish from './sv/translation.json';

type IProps = {
  selectedLanguage?: string;
  children: ReactNode;
};

export const AVAILABLE_LANGUAGES = ['fi', 'en', 'sv'];
export const DEFAULT_LANGUAGE = 'fi';

export const CurrentLanguageContext = createContext<string>(DEFAULT_LANGUAGE);

const resources = {
  fi: {
    translation: finnish,
  },
  sv: {
    translation: swedish,
  },
  en: {
    translation: english,
  },
};

const TranslationProvider = ({ children, selectedLanguage }: IProps) => {
  const currentLang = useCallback((): string => {
    if (!selectedLanguage) return DEFAULT_LANGUAGE;
    // Check if selectedLanguage is one of the available languages
    if (AVAILABLE_LANGUAGES.indexOf(selectedLanguage) > -1) {
      return selectedLanguage;
    } else {
      return DEFAULT_LANGUAGE;
    }
  }, [selectedLanguage]);

  const i18n = React.useMemo(() => {
    const instance = createInstance(
      {
        resources,
        lng: currentLang(),
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: {
          escapeValue: false,
        },
      },
      (err) => {
        if (err) return console.error(err);
      },
    );
    return instance;
  }, [currentLang]);

  return (
    <CurrentLanguageContext.Provider value={currentLang()}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </CurrentLanguageContext.Provider>
  );
};

export default TranslationProvider;
