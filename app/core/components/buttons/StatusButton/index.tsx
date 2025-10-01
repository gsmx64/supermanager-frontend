import { useState } from "react";
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
import { ArchiveIcon } from "@/core/components/icons/ArchiveIcon";
import { QuestionIcon } from "@/core/components/icons/QuestionIcon";


type StatusButtonProps = {
  id: number;
  title: string;
  status: number;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  handleStatus: (id: number, status: number, title: string) => void;
  handleRefresh: (value: boolean) => void;
};

const StatusButton = ({
    id,
    title,
    status,
    style,
    containerStyle,
    handleStatus,
    handleRefresh
}: StatusButtonProps) => {
  const { t } = useTranslation();
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";
  const [newStatusValue, setNewStatusValue] = useState(status);

  const changeStatus = (statusOption: string, id: number, title: string) => {
    let newStatusValue;
    switch (statusOption) {
      case 'status_active':
        newStatusValue = 1;
        break;
      case 'status_disabled':
        newStatusValue = 0;
        break;
      case 'status_archived':
        newStatusValue = 2;
        break;
      default:
        newStatusValue = 3;
        break;
    }
    handleStatus(id, newStatusValue, title);
    setNewStatusValue(newStatusValue);
    handleRefresh(true);
  };

  let statusColor: "danger" | "success" | "default" | "warning" | "primary" | "secondary" | "foreground" | undefined;
  let statusIcon;
  let statusText;

  switch (status) {
    case 0:
      statusColor = 'danger';
      statusIcon = (<DisabledIcon size={18} />);
      statusText = t('common.disabled');
      break;
    case 1:
      statusColor = 'success';
      statusIcon = (<CheckIcon size={18} />);
      statusText = t('common.active');
      break;
    case 2:
      statusColor = 'default';
      statusIcon = (<ArchiveIcon size={18} />);
      statusText = t('common.archived');
      break;
    default:
      statusColor = 'warning';
      statusIcon = (<QuestionIcon size={18} />);
      statusText = t('common.status-error');
  }

  return (
    <div className="flex gap-4" style={{...containerStyle}}>
      <Dropdown
        showArrow={true}
        style={{...style}}
      >
        <DropdownTrigger>
          <Chip
            color={statusColor}
            startContent={statusIcon}
            variant="bordered"
          >
            <Tooltip
              content={t('common.status-description')}
              color="primary"
              showArrow={true}
              style={{...style}}
            >
              {statusText}
            </Tooltip>
          </Chip>
        </DropdownTrigger>
        <DropdownMenu aria-label="Status menu" variant="faded">
          <DropdownSection title={t('common.status-change')}>
            {(status !== 1) ? (
              <DropdownItem
                key="status_active"
                textValue="status_active"
                color="success"
                variant="bordered"
                shortcut="⌘A"
                startContent={<CheckIcon className={iconClasses} />}
                onClick={() => {changeStatus("status_active", id, title);}}
              >
                <Chip
                  color="success"
                  variant="light"
                >
                  {t('common.active')}
                </Chip>
              </DropdownItem>
            ) : (
              <></>
            )}
            {(status !== 0) ? (
              <DropdownItem
                key="status_disabled"
                textValue="status_disabled"
                color="danger"
                variant="bordered"
                shortcut="⌘D"
                startContent={<DisabledIcon className={iconClasses} />}
                onClick={() => {changeStatus("status_disabled", id, title)}}
              >
                <Chip
                  color="danger"
                  variant="light"
                >
                  {t('common.disabled')}
                </Chip>
              </DropdownItem>
            ) : (
              <></>
            )}
            {(status !== 2) ? (
              <DropdownItem
                key="status_archived"
                textValue="status_archived"
                color="default"
                variant="bordered"
                shortcut="⌘S"
                startContent={<ArchiveIcon className={iconClasses} />}
                onClick={() => {changeStatus("status_archived", id, title)}}
              >
                <Chip
                  color="default"
                  variant="light"
                >
                  {t('common.archived')}
                </Chip>
              </DropdownItem>
            ) : (
              <></>
            )}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default StatusButton;