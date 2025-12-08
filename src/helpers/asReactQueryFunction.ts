import { AxiosError, AxiosResponse, isAxiosError } from "axios";

const parseAxiosError = (error: AxiosError) => {
  if (error.code === "ECONNABORTED") {
    return "Request timed out. The API is not responding.";
  }

  if (!error.response) {
    return "Unable to reach the API. Check your network connection.";
  }

  if (error.response.status === 401 || error.response.status === 403) {
    return "You are not authenticated. Please sign in again.";
  }

  const responseMessage =
    typeof error.response.data === "string"
      ? error.response.data
      : (error.response.data as { message?: string })?.message;

  return responseMessage || "Could not fetch data";
};

/**
 * Transforms axios api call into a function to be used with useQuery
 */
export const asReactQueryFunction = (
  apiCall: (params) => Promise<AxiosResponse>
) => {
  return async (params) => {
    try {
      const { data } = await apiCall(params);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(parseAxiosError(error));
      }
      throw error instanceof Error
        ? error
        : new Error("Could not fetch data");
    }
  };
};
