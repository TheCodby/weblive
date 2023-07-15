import DeleteModal from "@/app/[locale]/components/delete-modal";
import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
import TextInput from "@/app/[locale]/components/ui/text-input";
import { Room } from "@/app/interfaces/room";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  room: Room;
}

const SettingsModal = React.forwardRef(
  ({ isOpen, setIsOpen, room }: Props, ref) => {
    const [roomName, setRoomName] = React.useState(room.name);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const deleteRoom = () => {};
    const saveChanges = (e: React.FormEvent) => {
      e.preventDefault();
    };
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            open={isOpen}
            onClose={() => {
              if (!deleteModalOpen) setIsOpen(false);
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel>
                    <Card className="p-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl leading-6 font-bold"
                      >
                        Room Settings
                      </Dialog.Title>
                      <div className="flex flex-col gap-4 mt-2">
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={saveChanges}
                        >
                          <p className="text-sm text-gray-500">
                            You can change the room settings here.
                          </p>
                          <TextInput
                            variant="outlined"
                            placeholder="Room Name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            animatedPlaceholder
                          />
                          <Button
                            type="submit"
                            className="hover:text-white hover:bg-green-600 dark:hover:bg-green-800"
                          >
                            Save Changes
                          </Button>
                        </form>
                        <hr color="black" />
                        <Button
                          onClick={() => setDeleteModalOpen(true)}
                          variant="outlined"
                          className="hover:text-white hover:bg-red-600 dark:hover:bg-red-800"
                        >
                          Delete Room
                        </Button>
                      </div>
                    </Card>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <DeleteModal
          title="Confirm Room Deletion"
          message="Are you sure you want to delete this room? This action cannot be undone."
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onSubmit={deleteRoom}
        />
      </>
    );
  }
);
SettingsModal.displayName = "SettingsModal";
export default SettingsModal;
