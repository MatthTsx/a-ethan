import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import type { geralProps } from "~/libs/interfaces/geralProps";

interface props extends geralProps {
  text: string;
  Path: string;
  icon: string;
  show: boolean;
}

function Tab({ ...props }: props) {
  return (
    <Link
      className="flex scale-[0.975] items-center gap-x-2 rounded-full opacity-75 transition-all
    hover:scale-100 hover:bg-white/5 hover:opacity-100"
      href={props.Path}
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple">
        <FontAwesomeIcon
          icon={props.icon as IconProp}
          className="h-9 w-9 flex-shrink-0 rounded-full text-lightGolden"
        />
      </div>
      {props.show && <p className="font-semibold text-purple">{props.text}</p>}
    </Link>
  );
}

export default Tab;
