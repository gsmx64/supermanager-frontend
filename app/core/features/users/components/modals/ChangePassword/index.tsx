import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDraggable,
} from "@heroui/react";

import ChangePasswordForm from "@/core/features/users/forms/ChangePasswordForm";
import type { IUserChangePassword } from "@/core/features/users/interfaces/user.interface";


type ChangePasswordProps = {
  userId: number;
  userName: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleChangePassword: (id: number, userName: string, data: IUserChangePassword) => void;
};

export function ChangePassword({ userId, userName, isOpen, onOpenChange, handleChangePassword }: ChangePasswordProps) {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLElement>(null!);
  const {moveProps} = useDraggable({targetRef, canOverflow: true, isDisabled: !isOpen});

  return (
    <>
      <Modal backdrop="blur" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                {t('users.change-password')}
              </ModalHeader>
              <ModalBody>
                <ChangePasswordForm
                  userId={userId}
                  userName={userName}
                  handleChangePassword={handleChangePassword}
                  onCloseModal={onClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="ghost" onPress={onClose}>
                  {t('search.close')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangePassword;