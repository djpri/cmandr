import { Heading, Stack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import LinksList from "../components/links/LinksList/LinksList";
import UserLayout from "../layout/UserLayout";
import { getLinksFromDB } from "../data/links/getLinksFromDB";

function Links() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinksFromDB());
    console.log(location);
  }, [dispatch, location]);

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
