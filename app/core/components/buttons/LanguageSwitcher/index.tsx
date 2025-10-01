import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as HeroUIDropdown
} from "@heroui/react";

import toToast from "@/core/utils/toToast";
import { locales, type Locale } from "@/core/i18n/consts";
import LanguageIcon from "@heroicons/react/24/outline/LanguageIcon";
import EnUSFlag from "@/core/components/locales/enUSFlag";
import EsESFlag from "@/core/components/locales/esESFlag";


type LanguageSVGProps = {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LanguageLoaderIcon = ({width, height, color, className, style}: LanguageSVGProps) => {
  return (
    <svg
      width={width ? width : "1.5rem"}
      height={height ? height : "1.5rem"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={color ? color : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{...style}}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  );
};

const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const { t, i18n } = useTranslation();

  const handleLocaleChange = (locale: Locale, localeName: string) => {
    startTransition(async () => {
      try {
        await i18n.changeLanguage(locale);
        toToast({
          description: t('locale_switch.changed', { locale: localeName }),
          title: t('locale_switch.language'),
          color: "success",
          icon: <LanguageLoaderIcon className="animate-spin [animation-duration:0.3s]" />,
          shorter: true
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : t('error.unknown');
        console.error(errorMessage);
        toToast({
          description: t('error.change-language', { error: errorMessage }),
          title: t('locale_switch.language'),
          color: "danger",
          icon: <LanguageLoaderIcon className="animate-spin [animation-duration:0.3s]" />,
          shorter: true
        });
      }
    });
  };

  return (
    <>
      <HeroUIDropdown aria-label="Switch Language">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            {isPending ? (
              <LanguageLoaderIcon className="animate-spin [animation-duration:0.3s]" />
            ) : (
              <LanguageIcon className="w-7 rounded-full" />
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Switch Language" variant="faded">
          {locales.map((item) => (
            <DropdownItem
              key={item.key}
              onPress={() => handleLocaleChange(item.key, item.name)}
              className="flex flex-row items-center gap-2 text-default-500"
              startContent={
                (item.key === 'en') ? (
                    <EnUSFlag size={24} />
                ) : (item.key === 'es') ? (
                    <EsESFlag size={24} />
                ) : null
              }
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </HeroUIDropdown>
    </>
  );
};

export default LanguageSwitcher;