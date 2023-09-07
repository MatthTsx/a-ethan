import React from "react";

interface props {
  Open: boolean;
  func: React.Dispatch<React.SetStateAction<boolean>>;
}

function CloseOpen({ ...props }: props) {
  const stly = (multi: number) => ({
    rotate: props.Open ? 45 * multi + "deg" : "0deg",
    translate: props.Open ? "0em " + 0.45 * multi + "em" : "",
  });

  return (
    <button
      className="absolute top-5 mx-2 flex h-6 w-8 scale-95 flex-col gap-1.5 transition-all
    hover:scale-100"
      onClick={() => props.func((current) => !current)}
    >
      <div
        className="pointer-events-none h-2 w-8 rounded-sm bg-lightGolden transition-all"
        style={stly(1)}
      />
      <div
        className="pointer-events-none h-2 w-8 rounded-sm bg-lightGolden transition-all"
        style={stly(-1)}
      />
    </button>
  );
}

export default CloseOpen;
