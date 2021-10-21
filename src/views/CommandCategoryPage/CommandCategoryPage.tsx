import { Button, Heading, Stack } from "@chakra-ui/react";
import * as React from "react";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layouts/UserLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCommandsByCategory } from "../../redux/commands/commandsSlice";

function CommandCategoryPage({ category }) {
  let params: { id: string } = useParams();
  const reduxCommands = useSelector((state) =>
    selectCommandsByCategory(state, params.id)
  );

  return (
    <UserLayout>
      <Stack mb="30px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
          {params.id}
        </Heading>
        <Button>...</Button>
      </Stack>
      <CommandsList commands={reduxCommands} showCategories={false} />
    </UserLayout>
  );
}

export default CommandCategoryPage;
