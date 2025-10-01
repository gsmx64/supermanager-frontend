import { useTranslation } from "react-i18next";

import type { CounterProps } from "@/core/components/ui/Counter/types/Counter.type";


const Counter = ({
  count,
  style,
  className,
  containerStyle,
}: CounterProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 mb-2" style={{...containerStyle}}>
      <div
        className={`flex flex-row items-center gap-4 border-2 border-gray-300 whitespace-nowrap dark:border-gray-700 h-10 p-4 rounded-lg ${className}`}
        style={{...style}}
      >
          {t('common.total', { count: count })}
      </div>
    </div>
  )
};

export default Counter;