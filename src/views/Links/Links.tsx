import { Heading, HStack, Stack } from "@chakra-ui/layout";
import React from "react";
import LinksList from "../../components/LinksList/LinksList";
import UserLayout from "../../layout/UserLayout";

const testLinks = [
  { id: 1, title: "Github", link: "https://github.com" },
  { id: 2, title: "Github", link: "https://github.com" },
  { id: 3, title: "Github", link: "https://github.com" },
  { id: 4, title: "Github", link: "https://github.com" },
  { id: 5, title: "Github", link: "https://github.com" },
  { id: 6, title: "Github", link: "https://github.com" },
  { id: 7, title: "Github", link: "https://github.com" },
  { id: 8, title: "Github", link: "https://github.com" },
];

function Links() {
  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Links
      </Heading>
      <Stack>
        <LinksList links={testLinks} />
        {testLinks.map((item) => (
          <HStack>
            <p>{item.id}</p>
            <p>{item.link}</p>
            <p>{item.title}</p>
          </HStack>
        ))}
      </Stack>
    </UserLayout>
  );
}

export default Links;
