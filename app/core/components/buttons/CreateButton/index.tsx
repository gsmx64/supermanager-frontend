import { useTranslation } from "react-i18next";
import {
  Button,
  Tooltip,
  useDisclosure
} from "@heroui/react";

import { PlusIcon } from "@/core/components/buttons/CreateButton/components/PlusIcon";
import { Modal } from "@/core/layouts/default/components/Modal";


type CreateButtonProps<T> = {
  title: string;
  form?: React.ComponentType<any>;
  formProps?: any;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
};

const CreateButton = <T,>({
  title,
  form: FormComponent,
  formProps,  
  style,
  containerStyle,
}: CreateButtonProps<T>) => {
  const { t } = useTranslation();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const iconClasses = "text-primary-800 dark:text-primary-200 cursor-pointer active:opacity-50";

  return (
    <div className="flex gap-4 mb-2" style={{...containerStyle}}>
      <Tooltip
        content={t('common.create-description')}
        color="primary"
        showArrow={true}
      >
        <Button
          color="primary"
          variant="ghost"
          style={{...style}}
          onPress={onOpen}
          startContent={<PlusIcon color='rgb(37, 99, 235)' className={iconClasses} />}
        >
          {t('common.create')}
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

export default CreateButton;