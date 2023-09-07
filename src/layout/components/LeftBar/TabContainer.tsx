import React from "react";
import Tab from "./Tab";
import type { geralProps } from "~/libs/interfaces/geralProps";
import UserProfile from "./UserProfile";
import Tabs from "~/utils/constants/Tabs";

interface props extends geralProps {
  show: boolean;
}

function TabContainer({ ...props }: props) {
  return (
    <div className="mt-16 flex h-full w-full flex-col gap-y-5 overflow-hidden">
      {Tabs.map((T, i) => (
        <Tab {...props} key={i} {...T} />
      ))}
      <UserProfile {...props} />
    </div>
  );
}

export default TabContainer;
