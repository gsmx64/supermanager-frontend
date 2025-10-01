import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@heroui/react";

import "@/core/features/notifications/components/NotificationsList/style.css";
import { ViewNotification } from "@/core/features/notifications/components/ViewNotification";
import type { NotificationsListProps } from "@/core/features/notifications/types/notifications.type";
import DeleteNotification from "../DeleteNotification";


const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const ViewNotificationIcon = () => {
  const { t } = useTranslation();

  return (
    <Tooltip content={t('notifications.view-notification')}>
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EyeIcon />
      </span>
    </Tooltip>
  );
};

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};


const DeleteNotificationIcon = () => {
  const { t } = useTranslation();

  return (
    <Tooltip color="danger" content={t('notifications.delete-notification')}>
      <span className="text-lg text-danger cursor-pointer active:opacity-50">
        <DeleteIcon />
      </span>
    </Tooltip>
  );
};


const NotificationsList = ({ items, style, containerStyle, handleUpdateStatusNotification, handleDeleteNotification }: NotificationsListProps) => {
  const { t } = useTranslation();

  function getNotificationTypeLabel(type: string): string {
    switch (type) {
      case "default":
        return t("notifications.type-info");
      case "primary":
        return t("notifications.type-deploys");
      case "secondary":
        return t("notifications.type-calendary");
      case "warning":
        return t("notifications.type-warning");
      case "success":
        return t("notifications.type-success");
      case "danger":
        return t("notifications.type-error");
      default:
        return t("notifications.type-unknown");
    }
  }

  return (
    <>
      <div
        className="notifications-card-list-container"
        style={{ ...containerStyle }}
      >
        <Table
          aria-label="Notifications static collection table"
          color="secondary"
          style={{ ...style }}
        >
          <TableHeader>
            <TableColumn>{t('notifications.table-number-id')}</TableColumn>
            <TableColumn>{t('notifications.table-title')}</TableColumn>
            <TableColumn>{t('notifications.table-description')}</TableColumn>
            <TableColumn>{t('notifications.table-type')}</TableColumn>
            <TableColumn>{t('notifications.table-status')}</TableColumn>
            <TableColumn>{t('notifications.table-module')}</TableColumn>
            <TableColumn>{t('notifications.table-creator')}</TableColumn>
            <TableColumn>{t('notifications.table-created_at')}</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Chip
                    color={item.type}
                    variant="bordered"
                  >
                    <Link
                      to={`/notifications/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    color={item.type}
                    variant="bordered"
                  >
                    {item.description}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    color={item.type}
                    variant="bordered"
                  >
                    {getNotificationTypeLabel(item.type)}
                  </Chip>
                </TableCell>
                <TableCell>
                  {(item.status === 0) ? (
                    <span>{t('notifications.read')}</span>
                  ) : (
                    <span>{t('notifications.unread')}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    color="default"
                    variant="bordered"
                  >
                    <Link
                      to={`/${item.module}/${item.module_id}`}
                    >
                      {item.module}
                    </Link>
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    color="default"
                    variant="bordered"
                  >
                    <Link
                      to={`/users/${item.creator.id}`}
                    >
                      {item.creator.username}
                    </Link>
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    color="default"
                    variant="bordered"
                  >
                    {item.created_at}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    {
                      (item.status != 0) && (
                        <ViewNotification
                          item={item}
                          viewIcon={ViewNotificationIcon}
                          handleUpdateStatusNotification={handleUpdateStatusNotification}
                        />
                      )
                    }
                    <DeleteNotification
                      item={item}
                      deleteIcon={DeleteNotificationIcon}
                      handleDeleteNotification={handleDeleteNotification}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default NotificationsList;