"use client";
import React, { useEffect, useState } from "react";

const TimerCounter = ({ isLive }: { isLive: boolean }) => {
  const [time, setTime] = useState<string>("00:00:00");
  useEffect(() => {
    let interval: any = null;
    if (isLive) {
      interval = setInterval(() => {
        setTime((currentTime: string) => {
          const [hours, minutes, seconds] = currentTime.split(":");
          let newSeconds = parseInt(seconds) + 1;
          let newMinutes = parseInt(minutes);
          let newHours = parseInt(hours);
          if (newSeconds === 60) {
            newMinutes++;
            newSeconds = 0;
          }
          if (newMinutes === 60) {
            newHours++;
            newMinutes = 0;
          }
          return `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;
        });
      }, 1000);
    } else {
      setTime("00:00:00");
      clearInterval(interval);
    }
    return () => {
      setTime("00:00:00");
      clearInterval(interval);
    };
  }, [isLive]);
  if (!isLive) return null;
  return <p className="font-black text-2xl">{time}</p>;
};

export default TimerCounter;
