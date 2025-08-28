"use client";
import { useState } from "react";
import Button from "@/components/ui/button";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      home
      <Button
        className="mt-4"
        suffix={<span>🚀</span>}
        loading={isLoading}
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }}
      >
        Click Me
      </Button>
    </div>
  );
}
