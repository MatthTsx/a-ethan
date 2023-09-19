import React from "react";
import Tab from "./Tab";
import type { geralProps } from "~/libs/interfaces/geralProps";
import UserProfile from "./UserProfile";
import Tabs from "~/utils/constants/Tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { signOut } from "next-auth/react";

interface props extends geralProps {
  show: boolean;
}

function TabContainer({ ...props }: props) {
  return (
    <div className="mt-16 flex h-full w-full flex-col gap-y-5 overflow-hidden">
      {Tabs.map((T, i) => (
        <Tab {...props} key={i} {...T} />
      ))}
      <button
        className="flex scale-[0.975] items-center gap-x-2 rounded-full opacity-75 transition-all
        hover:scale-100 hover:bg-white/5 hover:opacity-100"
        onClick={() => {
          signOut().catch((err) => console.error(err));
        }}
      >
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple">
          <FontAwesomeIcon
            icon={"fa-right-from-bracket" as IconProp}
            className="h-9 w-9 flex-shrink-0 rounded-full text-lightGolden"
          />
        </div>
        {props.show && <p className="font-semibold text-purple">Sign Out</p>}
      </button>
      <UserProfile {...props} />
    </div>
  );
}

export default TabContainer;
