import Image from "next/image";
import React from "react";
import type { T1 } from "./ShowQuizzes";

interface props extends T1 {
  func: React.Dispatch<React.SetStateAction<T1 | undefined>>;
}

function QuizView({ ...props }: props) {
  return (
    <button className="group relative flex h-40 w-64 scale-[.975] cursor-pointer flex-col-reverse overflow-hidden rounded-md bg-black shadow-sm shadow-purple2 transition-all hover:scale-100">
      <Image
        className="h-full w-full rounded-md object-cover opacity-20 transition-all group-hover:opacity-90"
        src={props.Image!}
        width={100}
        height={100}
        alt="picture"
      />
      <div className="absolute z-10 flex h-10 w-full flex-col items-center justify-center bg-black">
        <h1 className=" overflow text-lg font-bold text-lightGolden opacity-50 transition-all group-hover:opacity-100">
          {props.Name.length > 27
            ? props.Name.slice(0, 26) + "..."
            : props.Name}
        </h1>
      </div>
    </button>
  );
}

export default QuizView;
