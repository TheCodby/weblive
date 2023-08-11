import DeleteModal from "@/app/[locale]/components/delete-modal";
import Loading from "@/app/[locale]/components/loading";
import Button from "@/app/[locale]/components/ui/button";
import TextInput from "@/app/[locale]/components/ui/text-input";
import useLocale from "@/app/hooks/useLocale";
import { Room, RoomForm } from "@/app/interfaces/room";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";
import { getUserTheme } from "@/app/utils/theme";
import Textarea from "@/app/[locale]/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import { Separator } from "@/app/[locale]/components/ui/separator";
interface Props {
  room: Room;
  messages: any;
  children: React.ReactNode;
}

const SettingsModal: React.FC<Props> = ({
  room,
  messages,
  children,
}: Props) => {
  const router = useRouter();
  const locale = useLocale();
  const [roomName, setRoomName] = React.useState(room.name);
  const [roomDescription, setRoomDescription] = React.useState(
    room.description
  );
  const [roomProtected, setRoomProtected] = React.useState<boolean>(
    room.type === 1
  );
  const [roomPassword, setRoomPassword] = React.useState(room.password);

  const [isUpdating, setIsUpdating] = React.useState(false);
  const deleteRoom = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/rooms/${room.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.push(`/${locale}/rooms`);
      router.refresh();
      toast(data.message, {
        type: "success",
        theme: getUserTheme(),
      });
    } catch (err: any) {
      toast(err.message, {
        type: "error",
        theme: getUserTheme(),
      });
    }
  };
  const saveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/rooms/${room.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: roomName,
            description: roomDescription,
            password_protected: roomProtected,
            password: roomPassword,
          } as RoomForm),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.refresh();
      toast(data.message, {
        type: "success",
        theme: getUserTheme(),
      });
    } catch (err: any) {
      toast(err.message, {
        type: "error",
        theme: getUserTheme(),
      });
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit room</DialogTitle>
          <DialogDescription>
            You can change the room settings here.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={saveChanges}>
          <label htmlFor="name" className="block text-start text-sm">
            Name
            <TextInput
              id="name"
              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </label>

          <label htmlFor="desc" className="block text-start text-sm">
            Description
            <Textarea
              id="desc"
              variant="outlined"
              rows={5}
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
            />
          </label>
          <label className="inline-flex gap-2 ">
            <TextInput
              onChange={(e) => setRoomProtected(e.target.checked)}
              checked={roomProtected}
              type="checkbox"
              className="accent-blue-500"
            />{" "}
            {messages.create_room.PASSWORD_PROTECTED}
          </label>
          <AnimatePresence>
            {roomProtected ? (
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
                className="block text-start text-sm"
              >
                Password
                <TextInput
                  variant="outlined"
                  onChange={(e) => setRoomPassword(e.target.value)}
                  value={roomPassword}
                  type="password"
                />
              </motion.label>
            ) : null}
          </AnimatePresence>
          <Button
            type="submit"
            className="hover:text-white hover:bg-green-600 dark:hover:bg-green-800"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loading /> Updating...{" "}
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
        <Separator />
        <DialogFooter>
          <DeleteModal
            title="Confirm Room Deletion"
            message="Are you sure you want to delete this room? This action cannot be undone."
            onSubmit={deleteRoom}
          >
            <Button
              variant="outlined"
              className="hover:text-white hover:bg-red-600 dark:hover:bg-red-800 w-full"
            >
              Delete Room
            </Button>
          </DeleteModal>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SettingsModal;
