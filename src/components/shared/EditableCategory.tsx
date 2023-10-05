import { EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Input,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import DeleteCategoryButton from "components/categories/DeleteCategoryButton";
import useCategories from "hooks/categories/useCategories";
import { CategoryReadDto } from "models/category";
import { Entity } from "models/entity";
import { useState } from "react";
import { CgCheck, CgClose } from "react-icons/cg";

interface IProps {
  category: CategoryReadDto;
  entity: Entity;
}

export default function EditableCategory({ category, entity }: IProps) {
  const { editCategoryMutation } = useCategories(entity);
  const [lastValue, setLastValue] = useState(category.name);

  const handleSubmit = (inputValue: string) => {
    const categoryUpdateDto = {
      name: category.name,
      parentId: category.parentId,
      isGroup: category.isGroup,
      displayIndex: category.displayIndex,
    };

    alert(JSON.stringify(categoryUpdateDto, null, 2));

    // editCategoryMutation.mutate({ id: category.id, body: categoryUpdateDto });
  };

  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" flexDirection="row">
        <Tooltip label="Set new category name" openDelay={500}>
          <IconButton
            icon={<CgCheck />}
            {...getSubmitButtonProps()}
            aria-label="check"
          />
        </Tooltip>
        <Tooltip label="Cancel edit" openDelay={500}>
          <IconButton
            icon={<CgClose />}
            {...getCancelButtonProps()}
            aria-label="close"
          />
        </Tooltip>
      </ButtonGroup>
    ) : (
      <ButtonGroup justifyContent="center" size="sm" flexDirection="row">
        <Tooltip label="Edit category name" openDelay={500}>
          <IconButton
            size="sm"
            icon={<EditIcon />}
            {...getEditButtonProps()}
            aria-label="edit"
          />
        </Tooltip>
          <DeleteCategoryButton
            categoryName={category.name}
            categoryId={category.id}
            entityType="command"
          />
      </ButtonGroup>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={category.name}
      fontSize="2xl"
      isPreviewFocusable={false}
      onSubmit={(value) => {
        setLastValue(value);
        if (value !== lastValue) {
          handleSubmit(value);
        }
      }}
      submitOnBlur={false}
    >
      {/* Here is the custom input */}
      <HStack>
        <EditablePreview fontSize={"2xl"} />
        <Input as={EditableInput} fontSize={"xl"} />
        <EditableControls />
      </HStack>
    </Editable>
  );
}
