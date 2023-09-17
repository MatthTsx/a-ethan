import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";
import { isValid_URL } from "~/utils/scripts/URL";
import InputSet1 from "./InputSet1";
import InputSet2 from "./InputSet2";
import { useRouter } from "next/router";
import InputSet3 from "./InputSet3";

interface props {
  UserId: string;
  userName: string;
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

  return (
    <div className="flex h-full w-full items-center justify-center rounded-md bg-black p-5">
      <div className="flex h-full w-fit flex-col gap-8 overflow-x-hidden overflow-y-scroll px-4 scrollbar scrollbar-thumb-purple2/50">
        <div className="flex h-48 w-full flex-shrink-0 items-center gap-12">
          <ImageInput />
          <InputSet1 func={handleUpdate} userName={props.userName} />
        </div>
        <InputSet2 func={setInputs} />
        <InputSet3 func={setInputs} vals={Inputs} />
        <button
          onClick={create}
          className="mb-16 h-16 w-[61.5%] flex-shrink-0 bg-blue-500"
        />
      </div>
      <div className="mx-2 h-full w-1 rounded-md bg-gradient-to-t from-black via-neutral-900 to-black" />
      <div className="h-full w-[30%] flex-col bg-green-500"></div>
    </div>
  );
}

export default MainCreate;
