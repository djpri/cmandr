import { Settings } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import { UserSettings } from "models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";

/**
 * Custom hook that contains react query logic for settings
 *
 * @example
 *
 * ```js
 * const { query } = useSettings();
 * const settings = query.data;
 * ```
 */
function useSettings() {
  const queryClient = useQueryClient();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  // Queries
  const query = useQuery<UserSettings>(['settings'], asReactQueryFunction(Settings.get), {
    enabled: isAppInitalized,
  });

  const editSettingsMutation = useMutation(Settings.update, {
    onMutate: async (newSettings: UserSettings) => {
      await queryClient.cancelQueries(['settings']);
      const previousSettings = queryClient.getQueryData(['settings']);
      queryClient.setQueryData(['settings'], newSettings);
      return { previousSettings };
    },
    onError: async (err, newSettings, context) =>
      queryClient.setQueryData(['settings'], context.previousSettings),
    onSettled: () => {
      queryClient.invalidateQueries(['settings']);
    },
  });

  return {
    query,
    editSettingsMutation,
  };
}

export default useSettings;
