import { IconButton, Tooltip } from "@chakra-ui/react";
import ConfirmActionDialog from "components/shared/ConfirmActionDialog";
import useCategories from "hooks/categories/useCategories";
import { Entity } from "models/entity";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface IProps {
  categoryName: string;
  categoryId: number;
  entityType: Entity;
}

function DeleteCategoryButton({
  categoryName,
  categoryId,
  entityType,
}: IProps) {
  const navigate = useNavigate();
  const { deleteCategoryMutation } = useCategories(entityType);

  const handleConfirmDelete = (close: () => void) => {
    deleteCategoryMutation.mutate(categoryId, {
      onSuccess: () => navigate("/dashboard"),
      onSettled: close,
    });
  };

  return (
    <ConfirmActionDialog
      title={`Delete "${categoryName}" ${entityType}s`}
      body="Deleting this category cannot be undone."
      confirmLabel="Delete"
      isLoading={deleteCategoryMutation.isLoading}
      onConfirm={handleConfirmDelete}
      trigger={(onOpen) => (
        <Tooltip label="Delete category" openDelay={500}>
          <IconButton
            size="sm"
            onClick={onOpen}
            variant="delete"
            icon={<AiFillDelete />}
            aria-label="delete-category"
            isDisabled={deleteCategoryMutation.isLoading}
          />
        </Tooltip>
      )}
    />
  );
}

export default DeleteCategoryButton;
