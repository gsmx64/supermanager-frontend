import { createElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  useDisclosure,
} from "@heroui/react";

import { Modal } from "@/core/layouts/default/components/Modal";


type DeleteNotificationProps = {
  item: {
    id: number;
    title: string;
    description: string;
  },
  deleteIcon: React.ElementType,
  handleDeleteNotification: (id: number) => void
};

export function DeleteNotification({
  item,
  deleteIcon,
  handleDeleteNotification
}: DeleteNotificationProps) {
  const { t } = useTranslation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button variant="light" color="danger" isIconOnly onPress={onOpen}>
        {createElement(deleteIcon)}
      </Button>
      <Modal
        TitleText={t('notifications.deleting-notification')}
        ActionText={t('notifications.delete')}
        Action={() => handleDeleteNotification(item.id)}
        CloseText={t('notifications.cancel')}
        Content={t('notifications.delete-notification-question', {title: item.title})}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export default DeleteNotification;