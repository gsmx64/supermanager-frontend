import { useTranslation } from "react-i18next";
import { Switch, Tooltip } from "@heroui/react";

import type { SwitchDataViewProps } from "@/core/components/ui/SwitchDataView/types/SwitchDataView.type";


const SwitchDataView = ({
  swapView,
  setSwapView,
  style,
  className,
  containerStyle,
}: SwitchDataViewProps) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      color="primary"
      content={t('common.switch-data-view')}
      showArrow={true}
    >
      <div
        className="flex flex-row items-center gap-4 border-2 border-gray-300 dark:border-gray-700 h-10 p-4 rounded-lg"
        style={{...containerStyle}}
      >
        <div>{swapView ? t('common.table') : t('common.cards')}</div>
        <Switch
          defaultSelected
          isSelected={swapView}
          onValueChange={setSwapView}
          size="md"
          aria-label={t('common.switch-data-view')}
          className={className}
          style={style}
        />
      </div>
    </Tooltip>
  )
};

export default SwitchDataView;