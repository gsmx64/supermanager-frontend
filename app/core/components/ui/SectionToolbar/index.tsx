import { useTranslation } from "react-i18next";

import SwitchDataView from "@/core/components/ui/SwitchDataView";
import Counter from "@/core/components/ui/Counter";
import type { SectionToolbarProps } from "@/core/components/ui/SectionToolbar/types/SectionToolbar.type";


const SectionToolbar = ({
  count,
  swapView,
  setSwapView,
  CreateButton,
  CreateButtonProps
}: SectionToolbarProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-end gap-2 flex-wrap">

      <SwitchDataView
        swapView={swapView}
        setSwapView={setSwapView}
      />

      {count ?
      (
        <Counter count={count ? count : 0} />
      ) : ''}

      {CreateButton && (
        <CreateButton
          {...CreateButtonProps}
        />
      )}

    </div>
  )
};

export default SectionToolbar;