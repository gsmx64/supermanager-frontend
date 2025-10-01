import { useTranslation } from "react-i18next";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip
} from "@heroui/react";

import { CheckIcon } from "@/core/components/icons/CheckIcon";
import { DisabledIcon } from "@/core/components/icons/DisabledIcon";


type ActiveButtonProps = {
  id: number;
  username: string;
  active: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  handleActive: (id: number, active: boolean, username: string) => void;
  handleRefresh: (value: boolean) => void;
};

const ActiveButton = ({
    id,
    username,
    active,
    style,
    containerStyle,
    handleActive,
    handleRefresh
}: ActiveButtonProps) => {
  const { t } = useTranslation();
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  const changeStatus = (active: boolean, id: number, username: string) => {
    handleActive(id, active, username);
    handleRefresh(true);
  };

  return (
    <div className="flex gap-4" style={{...containerStyle}}>
      <Dropdown
        showArrow={true}
        style={{...style}}
      >
        <DropdownTrigger>
          <Chip
            color={active ? 'success' : 'danger'}
            startContent={active ? <CheckIcon size={18} /> : <DisabledIcon size={18} />}
            variant="bordered"
          >
            <Tooltip
              content={t('common.active-description')}
              showArrow={true}
              color="primary"
              style={{...style}}
            >
              {active ? t('common.active') : t('common.disabled')}
            </Tooltip>
          </Chip>
        </DropdownTrigger>
        <DropdownMenu aria-label="Active menu" variant="faded">
          <DropdownSection title={t('common.active-change')}>
            {(active) ? (
              <DropdownItem
                key="active_disabled"
                textValue="active_disabled"
                color="danger"
                variant="bordered"
                shortcut="⌘D"
                startContent={<DisabledIcon className={iconClasses} />}
                onClick={() => {changeStatus(false, id, username);}}
              >
                <Chip
                  color="danger"
                  variant="light"
                >
                  {t('common.disabled')}
                </Chip>
              </DropdownItem>
            ) : (
              <DropdownItem
                key="active_enabled"
                textValue="active_enabled"
                color="success"
                variant="bordered"
                shortcut="⌘A"
                startContent={<CheckIcon className={iconClasses} />}
                onClick={() => {changeStatus(true, id, username);}}
              >
                <Chip
                  color="success"
                  variant="light"
                >
                  {t('common.active')}
                </Chip>
              </DropdownItem>
            )}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default ActiveButton;
