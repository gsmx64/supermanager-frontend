import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Modal as ModalHero,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable
} from "@heroui/react";


type ModalProps = {
  TitleText: React.ReactNode | string;
  CloseText?: React.ReactNode | string;
  ActionText?: React.ReactNode | string;
  ActionColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  Action?: () => void;
  Content?: string | React.ComponentType<{ onCloseModal: () => void }>;
  isOpen: boolean;
  onOpenChange: () => void;
  children?: React.ReactNode;
};

export function Modal({TitleText, CloseText, ActionText, ActionColor, Action, Content, isOpen, onOpenChange, children}: ModalProps) {
  const { t } = useTranslation();
  const targetRef = useRef<any>(null);
  const {moveProps} = useDraggable({targetRef, canOverflow: true, isDisabled: !isOpen});

  return (
    <>
      <ModalHero ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                {TitleText ? TitleText : t('common.modal-title')}
              </ModalHeader>
                <ModalBody>
                  {children}
                </ModalBody>
              <ModalFooter>
                {
                  (ActionText) && (
                    <Button color={ ActionColor ? ActionColor : "primary" } variant="ghost" onPress={() => { if (Action) Action(); onClose(); }}>
                      {ActionText}
                    </Button>
                  )
                }
                {(CloseText) && (
                  <Button color="secondary" variant="ghost" onPress={onClose}>
                    {CloseText}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </ModalHero>
    </>
  );
}
