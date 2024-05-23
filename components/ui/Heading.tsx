import React from "react";

export default function Heading({ children }: { children: React.ReactNode }) {
  return <div className=" text-2xl my-5">{children}</div>;
}
