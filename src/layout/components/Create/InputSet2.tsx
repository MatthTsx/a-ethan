import React from "react";
import type { Input_Interface } from "./MainCreate";

interface props {
  func: React.Dispatch<React.SetStateAction<Input_Interface>>;
}

function InputSet2({ ...props }: props) {
  return (
    <textarea
      className="h-[25rem] w-[45.2rem] flex-shrink-0 rounded-md bg-neutral-300 p-4 opacity-20 outline-none
transition-all focus:opacity-100"
      onChange={(e) =>
        props.func((current) => ({ ...current, desc: e.target.value }))
      }
      placeholder="Bio"
    />
  );
}

export default InputSet2;
