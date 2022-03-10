import { Heading, Stack } from "@chakra-ui/layout";
import React from "react";
import { useLocation } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import LinksList from "../components/links/LinksList/LinksList";

function Links() {
  const location = useLocation();

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Links
      </Heading>
      <Stack w="100%">
        <LinksList showCategories />
      </Stack>
    </UserLayout>
  );
}

export default Links;
