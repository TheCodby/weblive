import React from "react";

const GuestJoin = () => {
  return (
    <div className="card p-6 rounded-3xl justify-center text-center m-4">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-black dark:text-slate-200 text-slate-900 tracking-tight">
          Join To Room
        </p>
        <div className="input-group p-4">
          <input
            className="text-center tracking-[0.2rem] rounded"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Room ID"
          />
        </div>
        <div>
          <button className="w-1/2 btn">Join</button>
        </div>
      </div>
    </div>
  );
};

export default GuestJoin;
