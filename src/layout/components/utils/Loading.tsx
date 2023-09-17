import React from "react";

interface props {
  width: string;
  height: string;
  type: number;
  qntd?: number;
}

function Loading({ ...props }: props) {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
      }}
      className="flex h-36 w-full scale-95 animate-pulse items-center gap-4 rounded-md
    bg-gradient-to-tr from-neutral-900/60 to-neutral-900 p-2
    opacity-100 transition-all duration-200"
    >
      {props.type == 1 && Circle()}
      {props.type == 2 && Normal()}
      {props.type == 3 && CircleMid()}
    </div>
  );
}

function Circle() {
  return (
    <div className="ml-2 h-16 w-16 animate-spin rounded-full border-8 border-black border-b-purple" />
  );
}

function Normal() {
  return <div></div>;
}

function CircleMid() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-black border-b-purple" />
    </div>
  );
}

export default Loading;
