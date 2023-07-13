"use client";
import Loading from "@/app/[locale]/components/loading";
import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
import TextInput from "@/app/[locale]/components/ui/text-input";
import { getUserTheme } from "@/app/utils/theme";
import React, { useReducer } from "react";
import { toast } from "react-toastify";
type ReducerAction = {
  type: "CHANGE";
  field: string;
  payload: string;
};
type ReducerState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};
const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = ({ messages }: { messages: any }) => {
  const [formData, dispatch] = useReducer(reducer, initialValues);
  const [isLoading, setLoading] = React.useState(false);
  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/me/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message, {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
    } catch (err: any) {
      toast.error(err.message, {
        theme: getUserTheme(),
      });
    } finally {
      setLoading(false);
    }
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  return (
    <Card>
      <form
        onSubmit={handleChange}
        className="flex flex-col gap-3 p-5 justify-start items-start"
      >
        <label className="block">
          <span className="block text-sm font-medium text-neutral-400">
            {messages.settings.account.CURRENT_PASSWORD}
          </span>
          <TextInput
            value={formData.currentPassword}
            name="currentPassword"
            onChange={changeInput}
            type="password"
          />
          <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-neutral-400">
            {messages.settings.account.NEW_PASSWORD}
          </span>
          <TextInput
            value={formData.newPassword}
            name="newPassword"
            onChange={changeInput}
            type="password"
          />
          <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-neutral-400">
            {messages.settings.account.CONFIRM_PASSWORD}
          </span>
          <TextInput
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={changeInput}
            type="password"
          />
          <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
        </label>
        <Button type="submit" disabled={isLoading} variant="primary">
          {isLoading ? (
            <>
              <Loading /> {messages.main.LOADING}
            </>
          ) : (
            messages.settings.account.CHANGE_PASSWORD
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ChangePassword;
