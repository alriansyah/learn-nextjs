"use client";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const handleClick = (): void => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="">
      {/* <h1>Template : {count}</h1>
      <button onClick={handleClick}>Template Increment</button> */}
      {children}
    </div>
  );
}
