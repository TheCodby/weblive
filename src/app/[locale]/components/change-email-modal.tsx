import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import ChangeEmail from "../(user)/(verified)/settings/components/change-email";
import { User } from "@/app/interfaces/user";

const ChangeEmailModal = ({
  messages,
  user,
  children,
}: {
  messages: any;
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            Change your email address. We will send you a confirmation email.
          </DialogDescription>
        </DialogHeader>
        <ChangeEmail messages={messages} email={user.email!} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailModal;
