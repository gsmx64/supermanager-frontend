import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {
	format as formatDate,
	formatRelative,
	formatDistance,
	isDate
} from "date-fns";

import enTranslation from '../../../public/locales/en/translation.json';
import esTranslation from '../../../public/locales/es/translation.json';
import { defaultLocale, locales } from "@/core/i18n/consts";


i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {  
      loadPath: '/locales/{{lng}}/translation.json',  
    },
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: defaultLocale,
    interpolation: {
			// react already saves from xss
			escapeValue: false,

			format: (value, format, lng) => {
				if (isDate(value)) {
					const locale = (locales.find(l => l.key === lng)?.dateFnsLocale ?? locales[0].dateFnsLocale);

					if (format === "short")
						return formatDate(value, "P", { locale });
					if (format === "long")
						return formatDate(value, "PPPP", { locale });
					if (format === "relative")
						return formatRelative(value, new Date(), { locale });
					if (format === "ago")
						return formatDistance(value, new Date(), {
							locale,
							addSuffix: true
						});

					return formatDate(value, format ?? "P", { locale });
				}

				return value;
			}
		},
    react: {
      useSuspense: true,
    },
  });

export default i18n;
