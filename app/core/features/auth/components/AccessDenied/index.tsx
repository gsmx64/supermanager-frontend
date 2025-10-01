import { useTranslation } from "react-i18next";

import SectionCardError from "@/core/components/ui/UnderDevelopment";


const AccessDenied = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionCardError
        title={t('auth.access-denied-title')}
        description={t('auth.access-denied-description')}
        type="error"
      />
    </>
  );
}

export default AccessDenied;
