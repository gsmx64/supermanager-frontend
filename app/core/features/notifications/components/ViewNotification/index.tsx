import { createElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  useDisclosure,
} from "@heroui/react";

import { Modal } from "@/core/layouts/default/components/Modal";


type ViewNotificationProps = {
  item: {
    id: number;
    title: string;
    description: string;
  },
  viewIcon: React.ElementType,
  handleUpdateStatusNotification: (id: number, status: number, title: string) => void,
};

export function ViewNotification({
  item,
  viewIcon,
  handleUpdateStatusNotification
}: ViewNotificationProps) {
  const { t } = useTranslation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button variant="light" isIconOnly onPress={onOpen}>
        {createElement(viewIcon)}
      </Button>
      <Modal
        TitleText={t('notifications.viewing-notification', {title: item.title})}
        ActionText={t('notifications.mark-as-read')}
        Action={() => handleUpdateStatusNotification(item.id, 0, item.title)}
        CloseText={t('notifications.close')}
        Content={item.description}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export default ViewNotification;