import React from "react";
import type { geralProps } from "~/libs/interfaces/geralProps";
import CloseOpen from "../components/LeftBar/CloseOpen";
import TabContainer from "../components/LeftBar/TabContainer";

function LeftBar({ ...props }: geralProps) {
  const [showing, setShow] = React.useState(false);

  return (
    <div
      className="overflow-hidden bg-black p-1.5 transition-all"
      style={{ width: showing ? "15em" : "4em" }}
    >
      <CloseOpen Open={showing} func={setShow} />
      <TabContainer {...props} show={showing} />
    </div>
  );
}

export default LeftBar;
