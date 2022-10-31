import {AxiosResponse} from "axios";

/**
 * Transforms axios api call into a function to be used with useQuery
 */
export const asReactQueryFunction = (
  apiCall: (params) => Promise<AxiosResponse>
) => {
  return async (params) => {
    try {
      const {data} = await apiCall(params);
      return data;
    } catch (error) {
      throw new Error("Could not fetch data");
    }
  };
};
