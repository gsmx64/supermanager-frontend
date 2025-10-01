import { useTranslation } from "react-i18next";
import {
  Button,
  Tooltip,
  useDisclosure
} from "@heroui/react";

import { EditIcon } from "@/core/components/buttons/EditButton/components/EditIcon";
import { Modal } from "@/core/layouts/default/components/Modal";


type EditButtonProps<T> = {
  title: string;
  form?: React.ComponentType<any>;
  formProps?: any;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
};

const EditButton = <T,>({
    title,
    form: FormComponent,
    formProps,
    style,
    containerStyle
}: EditButtonProps<T>) => {
  const { t } = useTranslation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const iconClasses = "text-lg text-default-400 cursor-pointer active:opacity-50";

  return (
    <div className="flex gap-4" style={{ ...containerStyle }}>
      <Tooltip
        content={t('common.edit-description')}
        color="primary"
        showArrow={true}
      >
        <Button
          variant="light"
          isIconOnly
          style={{ ...style }}
          onPress={onOpen}
        >
          <EditIcon className={iconClasses} color="currentColor" />
        </Button>
      </Tooltip>
      <Modal
        TitleText={title}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <>
          {FormComponent && (
            <FormComponent
              {...formProps}
              onCloseModal={onOpenChange}
            />
          )}
        </>
      </Modal>
    </div>
  );
}

export default EditButton;