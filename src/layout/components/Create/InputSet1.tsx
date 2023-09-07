import React from "react";

interface props {
  userName: string;
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputSet1({ ...props }: props) {
  return (
    <div className="flex h-full w-32 flex-col gap-4 py-2">
      <input
        type="text"
        placeholder="Name"
        name="Name"
        onChange={props.func}
        className="mt-6 w-96 rounded-lg bg-neutral-200 p-4 py-2 font-semibold text-purple outline-none placeholder:text-black"
      />
      <input
        type="text"
        placeholder="Img Url"
        name="img"
        onChange={props.func}
        className="mt-6 w-96 rounded-lg bg-neutral-200 p-4 py-2 font-semibold text-purple outline-none placeholder:text-black"
      />
      <p className="ml-2 text-sm font-semibold text-lightGolden">
        Made by{" "}
        <span className="bg-gradient-to-t from-purple2 to-violet-500 bg-clip-text font-bold text-transparent">
          {props.userName}
        </span>
      </p>
    </div>
  );
}

export default InputSet1;
