"use client";
import Button from "@/app/[locale]/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import React from "react";
interface Props {
  message: string;
  children: React.ReactNode;
  title: string;
  onSubmit: () => Promise<void>;
}

const DeleteModal: React.FC<Props> = ({
  message,
  children,
  title,
  onSubmit,
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const onDelete = async () => {
    setIsDeleting(true);
    await onSubmit();
    setIsDeleting(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <Button
          onClick={onDelete}
          className="hover:text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteModal;
