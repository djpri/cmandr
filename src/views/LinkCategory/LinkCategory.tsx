import { Heading, Stack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import LinksList from "../../components/LinksList/LinksList";
import UserLayout from "../../layout/UserLayout";
import { selectUserUid } from "../../redux/auth/authSlice";
import { selectLinksCategoriesAsObject } from "../../redux/links/linksSlice";
import { getLinksByCategoryFromDB } from "../../services/links/getLinksByCategoryFromDB";

function LinkCategory() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);
  const params: { id: string } = useParams();
  const linkCategories = useSelector(selectLinksCategoriesAsObject);

  useEffect(() => {
    dispatch(getLinksByCategoryFromDB(parseInt(params.id)));
    console.log(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, location]);

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        {linkCategories[params.id]}
      </Heading>
      <Stack>
        <LinksList showCategories={false} />
      </Stack>
    </UserLayout>
  );
}

export default LinkCategory;
