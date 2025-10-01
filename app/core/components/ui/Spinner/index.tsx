import { useTranslation } from "react-i18next";
import { Spinner as HerouiSpinner } from "@heroui/react";


export function Spinner() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full w-full">
      <HerouiSpinner
        color="primary"
        label={t("common.loading")}
        size="lg"
        aria-label={t("common.loading")}
        className=""
      />
    </div>
  );
}
