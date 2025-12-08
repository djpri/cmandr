import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

type QueryStateProps<T> = {
  query: UseQueryResult<T>;
  loadingText?: string;
  emptyMessage?: string;
  children: (data: T) => ReactNode;
};

function QueryState<T>({
  query,
  loadingText,
  emptyMessage,
  children,
}: QueryStateProps<T>) {
  if (query.isLoading || (!query.data && query.isFetching)) {
    return (
      <Flex align="center" gap={3} py={4}>
        <Spinner size="sm" />
        <Text color="gray.300">{loadingText || "Loading..."}</Text>
      </Flex>
    );
  }

  if (query.isError) {
    const message =
      query.error instanceof Error
        ? query.error.message
        : "Unable to load data.";
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        <Flex direction="column" gap={2}>
          <AlertTitle>Unable to load</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
          <Button
            size="sm"
            alignSelf="flex-start"
            onClick={() => query.refetch()}
            variant="outline"
          >
            Retry
          </Button>
        </Flex>
      </Alert>
    );
  }

  if (!query.data) {
    return emptyMessage ? (
      <Text color="gray.400" py={4}>
        {emptyMessage}
      </Text>
    ) : null;
  }

  return <>{children(query.data)}</>;
}

export default QueryState;
