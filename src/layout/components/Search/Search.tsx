import React from "react";

interface props {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ ...props }: props) {
  const [placeholder, setPlaceholder] = React.useState("");

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") return;
    props.setText(placeholder);
  };

  return (
    <div className="flex h-16 w-full items-center justify-center p-1">
      <div
        className="mt-4 flex h-7 w-[60%] scale-[0.975] items-center justify-between gap-4 rounded-full bg-white px-4
        opacity-70 transition-all hover:scale-100 hover:opacity-100"
      >
        <input
          type="text"
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Search"
          className="h-full w-full bg-transparent px-4 outline-none"
          onKeyDown={keyDown}
        />
      </div>
    </div>
  );
}

export default Search;
