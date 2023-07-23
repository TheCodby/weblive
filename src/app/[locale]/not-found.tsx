"use client";

import { useRouter } from "next/navigation";
import Button from "./components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 justify-center items-center mt-6">
      <p className="text-3xl font-black">NOT FOUND</p>
      <p className="text-1xl font-black">Opps, You took the wrong path</p>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
