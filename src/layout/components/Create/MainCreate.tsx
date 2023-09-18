import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";
import { isValid_URL } from "~/utils/scripts/URL";
import InputSet1 from "./InputSet1";
import InputSet2 from "./InputSet2";
import { useRouter } from "next/router";
import InputSet3, { type Data } from "./InputSet3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface props {
  UserId: string;
  userName: string;
}

interface QuestionsData {
  Answers: {
    Text: string;
    value: number;
  }[];
  Correct: number;
  Text: string;
}

export interface Input_Interface {
  Name: string;
  img: string;
  desc: string;
  tags: Array<string>;
}

function MainCreate({ ...props }: props) {
  const createApi_ = api.Quiz.createQuiz.useMutation();
  const [Inputs, setInputs] = React.useState<Input_Interface>({
    desc: "",
    tags: [],
    img: "",
    Name: "",
  });
  const [TagData, setTagData] = React.useState<Array<Data>>([]);

  const [Editing, setEditing] = React.useState(0);
  const [Questions, setQuestions] = React.useState<Array<QuestionsData>>([]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((current) => ({ ...current, [e.target.name]: e.target.value }));
  };
  const Router = useRouter();
  const load = React.useRef(false);

  const create = () =>
    createApi_.mutate({
      _UserId: props.UserId,
      ...Inputs,
    });

  React.useEffect(() => {
    if (createApi_.status != "success" || load.current) return;
    Router.replace("")
      .then(() => {
        load.current = true;
        Router.push("QuizProfile/" + createApi_.data.id).catch((err) =>
          console.error(err)
        );
      })
      .catch((err) => console.log(err));
  }, [createApi_.status, createApi_.data, Router]);

  const ImageInput = () => (
    <Image
      width={300}
      height={300}
      priority
      alt="picture"
      src={
        isValid_URL(Inputs?.img ?? "") && Inputs?.img
          ? Inputs.img
          : "https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png"
      }
      className="h-48 w-72 rounded-md object-cover"
    />
  );

  const handleAddQuestion = () => {
    setQuestions((current) => [
      ...current,
      { Answers: [], Correct: 0, Text: "" },
    ]);
    setEditing(Questions.length + 1);
  };

  return (
    <div className="flex h-full w-full items-center justify-between rounded-md bg-black p-5 px-2">
      <>
        {Editing ? (
          creatingQuestionScreen()
        ) : (
          <div className="flex h-full w-fit flex-col gap-8 overflow-x-hidden overflow-y-scroll px-4 scrollbar scrollbar-thumb-purple2/50">
            <div className="flex h-48 w-full flex-shrink-0 items-center gap-12">
              <ImageInput />
              <InputSet1
                func={handleUpdate}
                userName={props.userName}
                Name={Inputs.Name}
                url={Inputs.img}
              />
            </div>
            <InputSet2 func={setInputs} Bio={Inputs.desc} />
            <InputSet3
              func={setInputs}
              vals={Inputs}
              TagData={TagData}
              setTagData={setTagData}
            />
            <button
              onClick={create}
              className="mb-16 h-16 w-[61.5%] flex-shrink-0 bg-blue-500"
            />
          </div>
        )}
        <div className="mx-2 h-full w-1 rounded-md bg-gradient-to-t from-black via-neutral-900 to-black" />
        <div className="flex h-full w-[31%] flex-col gap-2">
          <h2 className="w-full bg-gradient-to-t from-lightGolden via-lightGolden to-purple bg-clip-text text-center font-bold text-transparent">
            Questions
          </h2>
          <div className="flex h-[85%] w-full flex-col gap-2 overflow-y-scroll scrollbar-none">
            {Questions.map((dt, i) => questionView(dt.Text, i))}
          </div>
          <button
            className="flex w-full flex-col rounded-md bg-lightGolden p-1 px-4 opacity-80 transition-all hover:scale-[1.025] hover:opacity-100"
            onClick={handleAddQuestion}
          >
            Add
          </button>
        </div>
      </>
    </div>
  );
  function creatingQuestionScreen() {
    return (
      <div className="relative flex h-full w-[63.05%] flex-col gap-4 overflow-x-hidden overflow-y-scroll px-4 pl-12 scrollbar scrollbar-thumb-purple2/50">
        <button
          className="p-.5 absolute left-0 top-0 h-8 w-8 rounded-full bg-purple"
          onClick={() => setEditing(0)}
        >
          <FontAwesomeIcon
            icon={"fa-circle-xmark" as IconProp}
            className="h-full w-full"
          />
        </button>
        <h2 className="text-lightGolden">{Inputs.Name || "Name"}</h2>
        <div className="h-1 w-full bg-gradient-to-r from-lightGolden via-lightGolden to-purple" />
        <textarea
          className="w-full[45.2rem] h-[25rem] flex-shrink-0 rounded-md bg-purple/50 p-4 text-lightGolden opacity-75 outline-none transition-all focus:opacity-100"
          placeholder="Text"
          defaultValue={Questions[Editing - 1]?.Text}
          onChange={(e) =>
            setQuestions((current) => {
              current[Editing - 1]!.Text = e.target.value;
              return current;
            })
          }
        />
        <div className="my-2 h-1 w-full bg-gradient-to-r from-lightGolden/0 via-lightGolden to-lightGolden/0" />
        <p className="text-center font-semibold text-lightGolden">Choices:</p>
        {Questions[Editing]?.Answers.map((A, i) => AnswersView(i))}
        {AnswersView(0)}
        {AnswersView(1)}
        <button className="w-full rounded-md bg-lightGolden bg-opacity-70 font-semibold text-purple transition-all hover:bg-opacity-100">
          Add
        </button>
      </div>
    );
  }

  function AnswersView(index: number) {
    const isRight = Questions[Editing-1]?.Answers[index] == Questions[Editing]?.Correct

    return (
      <div key={index} className="flex h-32 w-[75%] gap-4 flex-shrink-0">
        <div className="flex w-[10%] flex-col items-center gap-4 py-2 rounded-md" style={{
          backgroundColor: isRight ? "#F9DA9E" : "#4d3e75",
        }}>
          {isRight ?
          <button className="w-7 h-7 group"><FontAwesomeIcon icon={"fa-square-check" as IconProp} className="w-full h-full group-hover:text-darkPurple"/></button>
          :<button className="w-7 h-7 group"><FontAwesomeIcon icon={"fa-square-xmark" as IconProp} className="w-full h-full group-hover:text-darkPurple"/></button>
        }
          <button className="group flex h-7 w-7 items-center rounded-full">
            <FontAwesomeIcon
              icon={"fa-trash" as IconProp}
              className="h-full w-full transition-all  group-hover:text-darkPurple"
            />
          </button>
        </div>
        <textarea
          className="h-full w-[80%] flex-shrink-0 rounded-md bg-purple/50 p-4 text-lightGolden opacity-75 outline-none transition-all focus:opacity-100"
          placeholder="Text"
          defaultValue={Questions[Editing - 1]?.Text}
        />
      </div>
    );
  }

  function questionView(Title: string, index: number) {
    return (
      <button
        className="flex min-h-[2em] w-full flex-col justify-center rounded-md bg-purple/20 p-2 opacity-80 transition-all hover:opacity-100 flex-shrink-0"
        key={index}
        onClick={() => setEditing(index + 1)}
      >
        <p className="font-semibold text-lightGolden">
          {Title.slice(0, 55)}
          {Title.length > 55 && "..."}
        </p>
        <div className="h-1 w-full bg-gradient-to-r from-lightGolden/20 via-lightGolden/50 to-black/0" />
      </button>
    );
  }
}

export default MainCreate;
