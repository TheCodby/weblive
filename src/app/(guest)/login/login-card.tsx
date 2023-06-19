"use client";
import Link from "next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "@/app/components/loading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const LoginCard = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();
  const sendLoginRequest = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };
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
        <form
          autoComplete="off"
          className="flex flex-col mt-6 gap-4"
          onSubmit={sendLoginRequest}
        >
          <div>
            <div className="input-group">
              <div className="image">
                <FaUserAlt />
              </div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className={`${error ? "invalid" : ""}`}
                disabled={isLoading}
                required
              />
            </div>
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <label className="invalid-feedback">{error}</label>
              </motion.div>
            ) : null}
          </div>
          <div className="input-group">
            <div className="image">
              <RiLockPasswordFill />
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <button type="submit" className="w-1/2 btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loading />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
      <p className="text-sm text-center whitespace-pre-line">
        Don't have an account?{" "}
        <Link className="text-blue-700 hover:text-blue-800" href={`/signup`}>
          Sign up
        </Link>{" "}
        now!
      </p>
    </div>
  );
};

export default LoginCard;
