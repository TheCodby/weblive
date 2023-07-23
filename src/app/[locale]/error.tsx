"use client";
import Button from "./components/ui/button";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="text-3xl font-black">{error.message}</p>
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
};
export default Error;
