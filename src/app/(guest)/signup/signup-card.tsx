"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "../../components/loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const SignupCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const sendSignupRequest = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast(data.message, {
        type: "success",
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="card p-6 rounded-3xl justify-center text-center m-4 md:w-96">
        <p className="dark:text-slate-200 tracking-tight font-black text-slate-900 mt-1 text-3xl">
          Join Us
        </p>
        <form
          autoComplete="off"
          className="flex flex-col mt-6 gap-4"
          onSubmit={sendSignupRequest}
        >
          <div className="input-group">
            <div className="image">
              <FaUserAlt />
            </div>
            <input
              className={`${error ? "invalid" : ""}`}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <div className="image">
              <RiLockPasswordFill />
            </div>
            <input
              className={`${error ? "invalid" : ""}`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div>
            <button className="w-1/2 btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loading />
                  Loading...
                </>
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
      </div>
      <p className="text-sm text-center">
        If you have an account you can{" "}
        <Link className="text-blue-700 hover:text-blue-800" href={`/login`}>
          Log In
        </Link>{" "}
      </p>
    </div>
  );
};

export default SignupCard;
