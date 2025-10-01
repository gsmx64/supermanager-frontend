import { useTranslation } from "react-i18next";
import {
  Button,
  Tooltip,
  useDisclosure
} from "@heroui/react";

import { Modal } from "@/core/layouts/default/components/Modal";
import { DeleteIcon } from "@/core/components/buttons/DeleteButton/components/DeleteIcon";


type DeleteButtonProps = {
  id: number;
  title: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  handleDelete: (id: number) => void;
  handleRefresh: (value: boolean) => void;
};

const DeleteButton = ({
    id,
    title,
    style,
    containerStyle,
    handleDelete,
    handleRefresh
}: DeleteButtonProps) => {
  const { t } = useTranslation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const iconClasses = "text-lg text-danger-600 dark:text-danger-200 cursor-pointer active:opacity-50";

  const deleteItem = (id: number) => {
    handleDelete(id);
    handleRefresh(true);
  };

  return (
    <div className="flex gap-4" style={{...containerStyle}}>
      <Tooltip
        content={t('common.delete-description')}
        color="primary"
        showArrow={true}
      >
        <Button
          variant="light"
          color="danger"
          isIconOnly
          style={{...style}}
          onPress={onOpen}
        >
          <DeleteIcon className={iconClasses} color="currentColor" />
        </Button>
      </Tooltip>
      <Modal
        TitleText={t('common.delete-modal-title')}
        ActionText={t('common.delete')}
        ActionColor="danger"
        Action={() => deleteItem(id)}
        CloseText={t('common.cancel')}
        Content={t('common.delete-modal-content', {title: title})}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default DeleteButton;