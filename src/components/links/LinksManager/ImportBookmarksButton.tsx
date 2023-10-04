import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import useLinks from "hooks/entities/useLinks";
import { ChangeEvent, useEffect, useRef } from "react";

function ImportBookmarksButton() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { importBookmarksMutation } = useLinks();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await importBookmarksMutation.mutateAsync(formData);
    }
  };

  useEffect(() => {
    if (importBookmarksMutation.isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [importBookmarksMutation.isLoading]);

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept=".html"
        onChange={handleFileChange}
      />
      <Button
        colorScheme="twitter"
        size="sm"
        fontSize="sm"
        onClick={() => fileInputRef.current?.click()}
        isDisabled={importBookmarksMutation.isLoading}
      >
        Import Bookmarks
      </Button>
      <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import In Progress</ModalHeader>
          <ModalBody>
            <div>Please wait while the bookmarks are imported...</div>
            <Spinner my={4}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImportBookmarksButton;
