import { AxiosResponse } from "axios";

/**
 * Transforms axios api call into a function to be used with useQuery
 */
export const asReactQueryFunction = (
  apiCall: () => Promise<AxiosResponse<any, any>>
) => {
  const transformedFunction = async () => {
    try {
      const { data } = await apiCall();
      return data;
    } catch (error) {
      return error;
    }
  };

  return transformedFunction;
};
