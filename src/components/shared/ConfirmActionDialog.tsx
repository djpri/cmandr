import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

type ConfirmActionDialogProps = {
  title: string;
  body?: ReactNode;
  confirmLabel?: string;
  confirmVariant?: ButtonProps["variant"];
  isLoading?: boolean;
  trigger: (onOpen: () => void) => ReactNode;
  onConfirm: (close: () => void) => void;
};

function ConfirmActionDialog({
  body,
  confirmLabel = "Confirm",
  confirmVariant = "delete",
  isLoading = false,
  onConfirm,
  title,
  trigger,
}: ConfirmActionDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {trigger(onOpen)}
      <AlertDialog
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        closeOnOverlayClick={!isLoading}
        closeOnEsc={!isLoading}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          {body && <AlertDialogBody>{body}</AlertDialogBody>}

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              mr={3}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant={confirmVariant}
              onClick={() => onConfirm(onClose)}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ConfirmActionDialog;
