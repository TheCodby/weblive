"use client";
import React, { useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import Loading from "../../components/loading";
import { useRouter } from "next/navigation";
import Button from "../../components/ui/button";
import TextInput from "../../components/ui/text-input";
import Card from "../../components/ui/card";
import Textarea from "../../components/ui/textarea";
interface State {
  roomName: string;
  roomDescription: string;
  passwordProtected: boolean;
  password: string;
}
interface Action {
  type: string;
  field: string;
  value: string | boolean;
}
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
const initialState = {
  roomName: "",
  roomDescription: "",
  passwordProtected: false,
  password: "",
};

const CreateRoom = ({ messages }: { messages: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: state.roomName,
          description: state.roomDescription,
          password_protected: state.passwordProtected,
          password: state.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message, {
        theme: getUserTheme(),
      });
      router.refresh();
    } catch (e: any) {
      toast.error(e.message, {
        theme: getUserTheme(),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="p-6 rounded-3xl justify-center text-center m-4">
      <form onSubmit={handleCreate} className="flex flex-col gap-4">
        <p className="text-2xl font-black dark:text-slate-200 text-slate-900 tracking-tight">
          {messages.create_room.TITLE}
        </p>
        <TextInput
          onChange={(e) =>
            dispatch({
              type: "CHANGE",
              field: "roomName",
              value: e.target.value,
            })
          }
          value={state.roomName}
          type="text"
          placeholder={messages.create_room.ROOM_NAME}
        />
        <Textarea
          onChange={(e) =>
            dispatch({
              type: "CHANGE",
              field: "roomDescription",
              value: e.target.value,
            })
          }
          value={state.roomDescription}
          placeholder={messages.create_room.ROOM_DESCRIPTION}
          rows={6}
        />
        <label className="inline-flex gap-3 items-center justify-center">
          <TextInput
            onChange={(e) =>
              dispatch({
                type: "CHANGE",
                field: "passwordProtected",
                value: !state.passwordProtected,
              })
            }
            checked={state.passwordProtected}
            type="checkbox"
            className="accent-blue-500"
          />{" "}
          {messages.create_room.PASSWORD_PROTECTED}
        </label>
        <AnimatePresence>
          {state.passwordProtected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <TextInput
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE",
                    field: "password",
                    value: e.target.value,
                  })
                }
                value={state.password}
                type="password"
                placeholder={messages.create_room.PASSWORD}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div>
          <Button disabled={isLoading} type="submit" className="w-1/2">
            {isLoading ? (
              <>
                <Loading /> {messages.main.LOADING}
              </>
            ) : (
              messages.create_room.CREATE
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateRoom;
