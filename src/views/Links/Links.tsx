import { Heading, Stack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LinksList from "../../components/LinksList/LinksList";
import UserLayout from "../../layout/UserLayout";
import { selectUserUid } from "../../redux/auth/authSlice";
import { getLinksFromDB } from "../../services/links/getLinksFromDB";

function Links() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);

  useEffect(() => {
    dispatch(getLinksFromDB());
    console.log(location);
  }, [dispatch, user, location]);

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Links
      </Heading>
      <Stack>
        <LinksList />
      </Stack>
    </UserLayout>
  );
}

export default Links;
