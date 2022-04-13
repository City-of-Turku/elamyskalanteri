import i18n from "i18next"
import { initReactI18next } from "react-i18next";

import finnish from "./fi/translation.json"
import swedish from "./sv/translation.json"
import english from "./en/translation.json"

const resources = {
  fi: {
    translation: finnish
  },
  sv: {
    translation: swedish
  },
  en: {
    translation: english
  }
}


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fi",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n