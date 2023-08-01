import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "../utils/notifications";
import { getNotificationNumbers } from "../utils/notifications";
import { INotif } from "../interfaces/notification";

export const useNotifications = () => {
  const queryClient = useQueryClient();
  return useQuery<INotif[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const data = await getNotifications(localStorage.getItem("token")!);
      queryClient.setQueryData(["notifications-number"], 0);
      return data;
    },
    enabled: false,
    refetchInterval: 60000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
export const useNotificationNumbers = () => {
  return useQuery<number>({
    queryKey: ["notifications-number"],
    queryFn: async () =>
      await getNotificationNumbers(localStorage.getItem("token")!),
    refetchInterval: 10000,
  });
};
