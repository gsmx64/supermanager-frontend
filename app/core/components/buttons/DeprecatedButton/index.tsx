import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Tooltip } from "@heroui/react";
import { booleanVerify } from "@/core/utils/booleanValue";


type DeprecatedButtonProps = {
  id: number;
  title: string;
  is_deprecated: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  handleDeprecated: (id: number, deprecated: boolean, title: string) => void;
  handleRefresh: (value: boolean) => void;
};

const DeprecatedButton = ({
    id,
    title,
    is_deprecated,
    style,
    containerStyle,
    handleDeprecated,
    handleRefresh
}: DeprecatedButtonProps) => {
  const { t } = useTranslation();

  const [isDeprecated, setIsDeprecated] = useState<boolean>(booleanVerify(is_deprecated));
  const changeDeprecated = (value: boolean, id: number, title: string) => {
    handleDeprecated(id, value, title);
    setIsDeprecated(value);
    handleRefresh(true);
  };

  useEffect(() => {
    setIsDeprecated(is_deprecated);
  }, [is_deprecated]);


  return (
    <div className="flex gap-4" style={{...containerStyle}}>
      <Tooltip
        placement="top"
        showArrow={true}
        color={is_deprecated ? "danger" : "primary"}
        style={{...style}}
        content={is_deprecated ? t('common.is-deprecated') : t('common.not-deprecated')}
      >
        <Switch
          name="is_deprecated"
          type="text"
          color={is_deprecated ? "danger" : "primary"}
          className="w-full"
          isSelected={booleanVerify(isDeprecated)}
          aria-label={is_deprecated ? t('common.is-deprecated') : t('common.not-deprecated')}
          onChange={() => changeDeprecated(booleanVerify(is_deprecated), id, title)}
          style={{...style}}
        />
      </Tooltip>
    </div>
  );
}

export default DeprecatedButton;