import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip
} from "@heroui/react";


type ActionButtonProps = {
  id: number;
  width?: string;
  height?: string;
  color?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

type ActionSVGProps = {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ActionButtonIcon = ({width, height, color, className, style}: ActionSVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      className={className}
      style={{...style}}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.04 10h2.58l.65 1H2.54l-.5-.5v-9l.5-.5h12l.5.5v4.77l-1-1.75V2h-11v8zm5.54 1l-1.41 3.47h2.2L15 8.7 14.27 7h-1.63l.82-1.46L12.63 4H9.76l-.92.59-2.28 5L7.47 11h1.11zm1.18-6h2.87l-1.87 3h3.51l-5.76 5.84L10.2 10H7.47l2.29-5zM6.95 7H4.04V6H7.4l-.45 1zm-.9 2H4.04V8H6.5l-.45 1z"
      />
    </svg>
  );
};

export const AddNoteIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CopyDocumentIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 13.15h-2.17c-1.78 0-3.23-1.44-3.23-3.23V7.75c0-.41-.33-.75-.75-.75H6.18C3.87 7 2 8.5 2 11.18v6.64C2 20.5 3.87 22 6.18 22h5.89c2.31 0 4.18-1.5 4.18-4.18V13.9c0-.42-.34-.75-.75-.75Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M17.82 2H11.93C9.67 2 7.84 3.44 7.76 6.01c.06 0 .11-.01.17-.01h5.89C16.13 6 18 7.5 18 10.18V16.83c0 .06-.01.11-.01.16 2.23-.07 4.01-1.55 4.01-4.16V6.18C22 3.5 20.13 2 17.82 2Z"
        fill="currentColor"
      />
      <path
        d="M11.98 7.15c-.31-.31-.84-.1-.84.33v2.62c0 1.1.93 2 2.07 2 .71.01 1.7.01 2.55.01.43 0 .65-.5.35-.8-1.09-1.09-3.03-3.04-4.13-4.16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ListboxWrapper = ({children}: {children: React.ReactNode}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const ActionButton = ({ id, width, height, color, style, containerStyle }: ActionButtonProps) => {
  const { t } = useTranslation();
  const iconClasses = "text-xl text-default-500 dark:text-default-400 pointer-events-none shrink-0";
  return (
    <div className="inline-flex items-center gap-4" style={{ ...containerStyle }}>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <Tooltip content={t('inventory.make-an-action')} color="primary" showArrow={true}>  
              <div>
                <ActionButtonIcon
                  width={width ? width : "1.5rem"}
                  height={height ? height : "1.5rem"}
                  color={color ? color : "currentColor"}
                  className={iconClasses}
                  style={{ ...style }}
                />
              </div>
            </Tooltip>  
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Options menu" variant="faded">
          <DropdownSection title={t('inventory.actions')}>
            <DropdownItem
              key="deploy"
              href={`/deploys/device/${id}`}
              description={t('inventory.make-a-deploy-details')}
              shortcut="⌘D"
              startContent={<AddNoteIcon className={iconClasses} />}
            >
              <div style={{ color: color ? color : "#bbb", ...style }}>
                {t('inventory.make-a-deploy')}
              </div>
            </DropdownItem>
            <DropdownItem
              key="reports"
              href={`/reports/device/${id}`}
              description={t('inventory.view-reports-details')}
              shortcut="⌘R"
              startContent={<CopyDocumentIcon className={iconClasses} />}
            >
              <div style={{ color: color ? color : "#bbb", ...style }}>
                {t('inventory.view-reports')}
              </div>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default ActionButton;