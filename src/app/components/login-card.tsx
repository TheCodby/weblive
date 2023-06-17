"use client";
import Link from "next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const LoginCard = () => {
  return (
    <div>
      <div className="card p-6 rounded-3xl justify-center text-center m-4">
        <h1 className="text-2xl font-black tracking-tight">
          Welcome again in{" "}
          <span className="dark:text-blue-700 text-blue-500 tracking-tighter">
            WebLive
          </span>
          !
        </h1>
        <p className="dark:text-slate-200 tracking-tight font-medium text-slate-900 mt-1">
          You should login first to start a new live stream
        </p>
        <form autoComplete="off" className="flex flex-col mt-6 gap-4">
          <div className="group input-group">
            <FaUserAlt />
            <input type="text" placeholder="Username" />
          </div>
          <div className="group input-group">
            <RiLockPasswordFill />
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <button className="w-1/2 btn">Login</button>
          </div>
        </form>
      </div>
      <p className="text-sm text-center">
        If you don't have an account please{" "}
        <Link className="text-blue-700 hover:text-blue-800" href={`/signup`}>
          Join Us
        </Link>{" "}
        now
      </p>
    </div>
  );
};

export default LoginCard;
