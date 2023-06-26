"use client";
import Loading from "@/app/[locale]/components/loading";
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
  const handleChange = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:3001/me/change-password", {
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
      });
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
  const changeInput = (e: any) => {
    dispatch({
      type: "CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  return (
    <form
      onSubmit={handleChange}
      className="md:w-1/2 flex flex-col gap-3 card p-5 justify-start items-start"
    >
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.settings.account.CURRENT_PASSWORD}
        </span>
        <input
          value={formData.currentPassword}
          name="currentPassword"
          onChange={changeInput}
          className="input dark:bg-neutral-800 dark:text-neutral-100 mt-1 peer invalid:border-red-500"
          type="password"
        />
        <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.settings.account.NEW_PASSWORD}
        </span>
        <input
          value={formData.newPassword}
          name="newPassword"
          onChange={changeInput}
          className="input dark:bg-neutral-800 dark:text-neutral-100 mt-1 peer invalid:border-red-500"
          type="password"
        />
        <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.settings.account.CONFIRM_PASSWORD}
        </span>
        <input
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={changeInput}
          className="input dark:bg-neutral-800 dark:text-neutral-100 mt-1 peer invalid:border-red-500"
          type="password"
        />
        <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="btn dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-300 text-black dark:text-white shadow-none"
      >
        {isLoading ? (
          <>
            <Loading /> {messages.main.LOADING}
          </>
        ) : (
          messages.settings.account.CHANGE_PASSWORD
        )}
      </button>
    </form>
  );
};

export default ChangePassword;
