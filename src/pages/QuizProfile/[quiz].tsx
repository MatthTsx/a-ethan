import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Loading from "~/layout/components/utils/Loading";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";
import { api } from "~/utils/api";

function Quiz() {
  const session = useSession();
  const id = useRouter().asPath.replace("/QuizProfile/", "");
  const QuizData = api.Quiz.getQuiz.useQuery({
    id,
    userID: session.data!.user.id,
  });
  console.log(QuizData.data);

  return (
    <>
      <Header name="A-ethan" />
      <GeralLayout session={session.data!}>
        <div className="flex h-full w-full flex-col items-center rounded-md bg-black">
          {QuizData.status != "success" ? loadingScreen() : Display()}
        </div>
      </GeralLayout>
    </>
  );

  function Display() {
    return (
      <div className="flex h-full w-full gap-4 p-4">
        {LeftPart()}
        <div className="mx-2 h-full w-1 bg-gradient-to-t from-black/0 via-purple/20 to-black/0" />
        <div className="flex h-full w-[53%] gap-4 p-4">
          {QuizData.data?.tags.map((data, i) => (
            <div
              className={`group flex h-fit w-fit cursor-default items-center gap-2 rounded-md bg-neutral-900 p-1 px-2 text-sm font-semibold text-lightGolden`}
              key={i}
            >
              <div
                style={{ backgroundColor: "rgb(" + data.Color + ")" }}
                className="h-2 w-2 rounded-full"
              />
              {data.Tittle}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function LeftPart() {
    return (
      <div className="flex h-full w-[42%] flex-col gap-4 overflow-y-hidden">
        <div className="flex w-full items-center justify-center text-xl font-semibold text-lightGolden">
          <span className="text-purple">=</span>
          <div className="mt-1 h-1 w-16 bg-gradient-to-l from-lightGolden to-purple/50" />
          =-{QuizData.data?.Name.slice(0, 27)}-=
          <div className="mt-1 h-1 w-16 bg-gradient-to-r from-lightGolden to-purple/50" />
          <span className="text-purple">=</span>
        </div>

        <div className="flex items-end gap-4">
          <Image
            alt="photo"
            src={QuizData.data!.Image!}
            width={160}
            height={160}
            className="h-44 w-[50%] rounded-md object-cover object-center"
          />
          <div className="flex flex-col gap-4">
            <p className="cursor-default rounded-md bg-purple2/30 p-2 py-1 text-lightGolden opacity-80 transition-all hover:opacity-100">
              <span className="font-semibold text-purple2">Score:</span>{" "}
              {QuizData.data?.Scores ? "?" : 3}/
              {QuizData.data?.Questions.length}
            </p>
            <p className="cursor-default rounded-md bg-purple2/30 p-2 py-1 text-lightGolden opacity-80 transition-all hover:opacity-100">
              <span className="font-semibold text-purple2">
                número de questões:
              </span>{" "}
              {QuizData.data?.Questions.length}
            </p>
            <Link
              className="cursor-pointer rounded-md bg-lightGolden p-2 py-1 font-semibold text-purple opacity-80 transition-all hover:scale-105 hover:opacity-100"
              href={"/Quiz/" + id}
            >
              Start Quiz
            </Link>
          </div>
        </div>

        <div className="group flex items-center">
          <Image
            alt="picture"
            src={QuizData.data!.User.image!}
            width={100}
            height={100}
            className="aspect-square w-10 rounded-full object-cover object-center grayscale-[.5] transition-all group-hover:grayscale-0"
          />
          <Link
            className="ml-2 text-sm font-semibold text-lightGolden"
            href={"/profile/" + QuizData.data?.User.id}
          >
            Made by{" "}
            <span className="bg-gradient-to-t from-purple2 to-violet-500 bg-clip-text font-bold text-transparent">
              {QuizData.data?.User.name}
            </span>
          </Link>
        </div>

        <p className="text-purple2">{QuizData.data?.Description}</p>
      </div>
    );
  }
}

function loadingScreen() {
  return (
    <div className="relative flex h-full w-full items-center gap-2 p-4">
      <Loading height="100%" width="42%" type={3} />
      <Loading height="100%" width="53%" type={2} />
    </div>
  );
}

export default Quiz;
