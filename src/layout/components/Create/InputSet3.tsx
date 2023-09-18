import React from "react";
import type { Input_Interface } from "./MainCreate";
import { api } from "~/utils/api";
import { rand_RGB } from "~/utils/scripts/randomColor";
import Loading from "../utils/Loading";

interface props {
  func: React.Dispatch<React.SetStateAction<Input_Interface>>;
  vals: Input_Interface | undefined;
  TagData: Data[];
  setTagData: React.Dispatch<React.SetStateAction<Data[]>>;
}

export interface Data {
  Color: string;
  id: string;
  Tittle: string;
}

function InputSet3({ ...props }: props) {
  const [text, setText] = React.useState("");
  const tagsApi = api.search.getTags.useQuery({ text });
  //   type TagData = typeof tagsApi.data
  const createTag = api.Quiz.createTag.useMutation();

  const handleNew = () => {
    createTag.mutate({
      Color: rand_RGB(),
      Tittle: text,
    });
  };

  const addToTags = (dt: Data) => {
    if (props.TagData.find((d) => d.id == dt.id)) return;
    props.setTagData((current) => [...current, dt]);
    props.func((current) => ({
      ...current,
      tags: [...current?.tags, dt.id],
    }));
  };
  const DeleteTagData = (dt: Data) => {
    props.setTagData((current) => {
      const index = current.indexOf(props.TagData.find((d) => d.id == dt.id)!);
      if (index < 0) return current;
      return current.splice(index, 1);
    });
    props.func((current) => {
      const index = current.tags.indexOf(dt.id);
      if (index < 0) return current;
      current?.tags.splice(index, 1);
      return current;
    });
  };

  return (
    <div className="w-[45.2rem]">
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        className="rounded-md p-4 py-2 outline-none"
        placeholder="Search Tags"
      />
      <div className="flex h-52 overflow-y-scroll scrollbar scrollbar-thumb-purple2/20">
        {tagsApi.status == "loading" ? (
          <div className="flex w-[47.5%] justify-center">
            <Loading height={"6em"} width="6em" type={1} />
          </div>
        ) : (
          <div className="min-h-48 relative my-2 flex w-[47.5%] flex-col gap-1">
            {tagsApi.data?.map((data, i) =>
              TagView({ ...data, removable: false, func: addToTags, key: i })
            )}
            {tagsApi.data?.length == 0 && tagsApi.status == "success" && (
              <button
                onClick={handleNew}
                className="absolute bottom-0 w-full scale-[0.975] rounded-lg bg-lightGolden opacity-60 transition-all hover:scale-100 hover:opacity-100"
              >
                Add
              </button>
            )}
          </div>
        )}
        <div className="mx-4 h-full w-1 bg-gradient-to-t from-black via-neutral-900 to-black" />
        <div className="relative my-2 flex h-48 w-[47.5%] flex-col gap-1">
          {props.TagData.map((tg, i) =>
            TagView({ ...tg, removable: true, func: DeleteTagData, key: i })
          )}
        </div>
      </div>
    </div>
  );
}

function TagView(data: {
  Color: string;
  id: string;
  Tittle: string;
  removable: boolean;
  key?: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  func: Function;
}) {
  return (
    <button
      className={`group flex w-fit items-center gap-2 rounded-md bg-neutral-900 p-1 px-2 text-sm font-semibold`}
      onClick={() => {
        data.func({ Color: data.Color, id: data.id, Tittle: data.Tittle });
      }}
      key={data.key}
    >
      <div
        style={{ backgroundColor: "rgb(" + data.Color + ")" }}
        className="h-2 w-2 rounded-full"
      />
      {data.Tittle}
    </button>
  );
}

export default InputSet3;
