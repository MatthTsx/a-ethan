import Image from "next/image";
import React from "react";
import type { T1 } from "./ShowQuizzes";
import Link from "next/link";

interface props extends T1 {
  func: React.Dispatch<React.SetStateAction<T1 | undefined>>;
}

function QuizView({ ...props }: props) {
  return (
    <Link
      className="group relative flex h-64 w-64 scale-[.975] cursor-pointer flex-col-reverse overflow-hidden rounded-md bg-black shadow-sm shadow-purple2 transition-all hover:scale-100"
      href={"/QuizProfile/" + props.id}
    >
      <Image
        className="h-full w-full rounded-md object-cover opacity-20 transition-all group-hover:opacity-90"
        src={props.Image!}
        width={160}
        height={160}
        alt="picture"
      />
      <div className="items-cente absolute z-10 flex h-24 w-full flex-col bg-black py-2 pl-2">
        <h1 className=" overflow text-lg font-bold text-lightGolden opacity-50 transition-all group-hover:opacity-100">
          {props.Name.length > 27
            ? props.Name.slice(0, 26) + "..."
            : props.Name}
        </h1>
        <p className=" overflow px-4 text-sm font-bold text-purple opacity-50 transition-all group-hover:opacity-100">
          {props.Description!.length > 90
            ? props.Description!.slice(0, 90) + "..."
            : props.Description}
        </p>
      </div>
    </Link>
  );
}

export default QuizView;
