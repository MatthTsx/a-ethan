import React from "react";
import { api } from "~/utils/api";
import QuizView from "./QuizView";
import Loading from "../utils/Loading";

interface props {
  SearchValue: string;
}

// type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
//   ? ElementType
//   : never;

export interface T1 {
  Name: string;
  Description: string | null;
  id: string;
  tags: {
    Tittle: string;
    id: string;
  }[];
  User: {
    name: string | null;
    id: string;
  };
  Image: string | null;
}

function ShowQuizzes({ ...props }: props) {
  const getQuizs = api.search.getQuizes.useQuery({
    contains: props.SearchValue,
  });
  const [viewing, setViewing] = React.useState<T1>();

  return (
    <div className="flex w-full flex-wrap gap-4 overflow-y-scroll px-16">
      {getQuizs.status == "loading" ? (
        <div className="flex w-full items-center justify-center">
          <Loading height={"6em"} width="6em" type={1} />
        </div>
      ) : (
        getQuizs.data?.map((d, i: React.Key | null | undefined) => (
          <QuizView key={i} {...d} func={setViewing} />
        ))
      )}
      {viewing && <div>Olahndo</div>}
    </div>
  );
}

export default ShowQuizzes;
