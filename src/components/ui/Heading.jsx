"use client";
import { twMerge } from "tailwind-merge";

export function Heading(props) {

  return (
      <h2 className={`heading`}>
        {props.children}
      </h2>
  );
}
