"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Button from "./components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="text-3xl font-black">Something went wrong!</p>
        <Button
          variant="primary"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
