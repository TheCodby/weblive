import { useEffect, useState } from "react";
import { INotif } from "../interfaces/notification";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotif[]>([]);
  const [isShown, setIsShown] = useState<boolean>(true); // check if the notification is shown or not
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API}/me/notifications`,
      {
        withCredentials: true,
      }
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((currentNotifications) => [
        ...currentNotifications,
        ...data.notifications,
      ]);
      if (data.notifications.length > 0) setIsShown(false);
    };
  }, []);
  return { notifications, isShown, setIsShown };
};
