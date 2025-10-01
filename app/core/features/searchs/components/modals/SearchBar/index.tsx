import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable
} from "@heroui/react";

import SearchBarIcon from "@/core/components/icons/SearchBarIcon";
import SearchForm from "@/core/features/searchs/forms/SearchForm";


const SearchModal = () => {
  const { t } = useTranslation();

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const targetRef = useRef<HTMLElement>(null!);
  const {moveProps} = useDraggable({targetRef, canOverflow: true, isDisabled: !isOpen});

  return (
    <>
      <Button variant="light" isIconOnly onPress={onOpen}>
        <SearchBarIcon
          height="10em"
          width="10em"
          className={"text-black/50 dark:text-white/90 text-slate-400 pointer-events-none shrink-0 fill-current w-6 h-6 "}
        />
      </Button>
      <Modal backdrop="blur" ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                {t('search.title')}
              </ModalHeader>
              <ModalBody>
                <SearchForm
                  onClose={onClose}
                />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModal;