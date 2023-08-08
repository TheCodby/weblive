import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
interface Props {
  message: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteModal = React.forwardRef(
  ({ message, title, onSubmit, isOpen, onClose }: Props, ref) => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={isOpen}
          onClose={onClose}
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
                      className="text-2xl leading-6 font-black"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="flex flex-col gap-4 mt-2">
                      <p className="text-lg text-gray-500">{message}</p>
                      <div>
                        <Button
                          onClick={onSubmit}
                          className="hover:text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                        >
                          DELETE
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);
DeleteModal.displayName = "DeleteModal";
export default DeleteModal;
