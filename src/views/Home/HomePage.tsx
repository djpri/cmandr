import { Box, Grid, VStack, Text } from "@chakra-ui/react";
import * as React from "react";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layouts/UserLayout";

function HomePage() {
  return (
    <UserLayout>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>Commander</Text>
          </VStack>
        </Grid>
      </Box>
      <CommandsList />
    </UserLayout>
  );
}

export default HomePage;
