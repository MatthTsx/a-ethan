import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loading from "~/layout/components/utils/Loading";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";
import { api } from "~/utils/api";

interface data {
  Answers: {
    id: string;
    Text: string;
    value: number;
    QuestionId: string;
  }[];
  id: string;
  Text: string;
}

function Home() {
  const session = useSession();
  const id = useRouter().asPath.replace("/Quiz/", "");
  // const resetScore = api.Quiz.resetScore.useMutation();

  const QuestionsData = api.Quiz.getQuestions.useQuery({ id });
  const [Questions, setQuestions] = React.useState<typeof QuestionsData.data>(
    QuestionsData.data
  );

  const [AwnseredId, setAwnseredId] = React.useState("");
  const {
    refetch: GetCorrectAnswer,
    data: CorrectAnwser,
    status: CorA_Status,
  } = api.Quiz.getCorrect.useQuery({
    id: AwnseredId,
  });

  const [currentQuestion, setCurrentQuestion] = React.useState<data>();
  const [currentSelected, setCurrentSelected] = React.useState("");

  const loaded = React.useRef(false);

  React.useEffect(() => {
    if (!loaded.current && QuestionsData.status == "success") {
      loaded.current = true;
      // resetScore.mutate({ QuizId: id, UserId: session.data!.user.id });
      setQuestions(QuestionsData.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QuestionsData.status]);

  const newQuestion = () => {
    const nmb = Math.floor(Math.random() * Questions!.length);

    setCurrentQuestion(Questions![nmb]);
    setQuestions((current) => {
      const index_ = current!.indexOf(
        current!.find((i) => i.id == current![nmb]!.id)!
      );

      if (index_ < 0) return current;
      current?.splice(index_, 1);
      return current;
    });
  };

  const Start = () => {
    newQuestion();
  };

  return (
    <>
      <Header name="A-ethan" />
      <GeralLayout session={session.data!}>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-black">
          {QuestionsData.isLoading ? (
            LoadingScreen()
          ) : currentQuestion ? (
            QuestionView()
          ) : Questions?.length ? (
            startScreen()
          ) : (
            <button
              className="text-lightGolden"
              onClick={() => {
                Start();
              }}
            >
              Cabo
            </button>
          )}
        </div>
      </GeralLayout>
    </>
  );

  function startScreen() {
    return (
      <button
        onClick={Start}
        className="h-12 w-32 scale-[.98] rounded-md bg-lightGolden font-semibold text-darkPurple transition-all hover:scale-100"
      >
        Start
      </button>
    );
  }

  function LoadingScreen() {
    return <Loading height="32em" width="32em" type={3} />;
  }

  function HandleEnvio() {
    setAwnseredId(currentQuestion!.id);
    GetCorrectAnswer;
  }

  function QuestionView() {
    return (
      <div className="flex h-full w-[60%] flex-col items-center gap-4 overflow-y-scroll p-4 scrollbar-none">
        <p className="h-fit min-h-[8em] w-full rounded-md bg-darkPurple p-4 text-lightGolden">
          {currentQuestion?.Text}
        </p>
        <div className="flex h-[70%] w-full flex-col gap-4 overflow-y-scroll scrollbar-none">
          {currentQuestion?.Answers.map((ans) => AnswerView(ans))}
        </div>
        <div className="flex w-full justify-between p-4 ">
          <button
            onClick={HandleEnvio}
            className="w-[40%] rounded-md bg-purple transition-all disabled:scale-[0.98] disabled:opacity-60 disabled:hover:cursor-not-allowed"
            disabled={
              CorrectAnwser?.id == currentQuestion?.id
                ? true
                : CorA_Status == "loading"
            }
          >
            Enviar
          </button>
          <button
            onClick={() => {
              newQuestion();
              if (Questions!.length <= 0)
                QuestionsData.refetch()
                  .then((d) => setQuestions(d.data))
                  .catch((err) => console.error(err));
            }}
            className="w-[40%] rounded-md bg-purple transition-all disabled:scale-[0.98] disabled:opacity-60 disabled:hover:cursor-not-allowed"
            disabled={CorrectAnwser?.id != currentQuestion?.id}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  function AnswerView({
    id,
    Text,
    value,
    QuestionId,
  }: {
    id: string;
    Text: string;
    value: number;
    QuestionId: string;
  }) {
    return (
      <button
        className="flex h-fit min-h-[4em] scale-[.98] rounded-md border bg-darkPurple/70 p-4 text-lightGolden transition-all hover:scale-100"
        style={{
          backgroundColor: currentSelected == id ? "#573e7a" : "#201930",
          borderColor:
            CorrectAnwser?.id == QuestionId
              ? CorrectAnwser.Correct == value
                ? "green"
                : "red"
              : "transparent",
        }}
        onClick={() => setCurrentSelected(id)}
        disabled={currentQuestion?.id == CorrectAnwser?.id}
        key={id}
      >
        <p className="flex w-[90%] items-start">{Text}</p>
      </button>
    );
  }
}

export default Home;
