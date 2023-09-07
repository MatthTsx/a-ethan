import React from "react";
import { api } from "~/utils/api";

interface props {
  SearchValue: string;
}

function ShowQuizzes({ ...props }: props) {
  const getQuizs = api.search.getQuizes.useQuery({
    contains: props.SearchValue,
  });

  return (
    <div className="h-full w-full overflow-y-scroll p-4">
      {getQuizs.data?.map((d, i) => (
        <div key={i}>{d.Name}</div>
      ))}
    </div>
  );
}

export default ShowQuizzes;
