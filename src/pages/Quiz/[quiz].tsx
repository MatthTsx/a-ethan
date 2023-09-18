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
  const resetScore = api.Quiz.resetScore.useMutation();

  const QuestionsData = api.Quiz.getQuestions.useQuery({ id });
  const [Questions, setQuestions] = React.useState<typeof QuestionsData.data>(
    QuestionsData.data
  );
  const [currentQuestion, setCurrentQuestion] = React.useState<data>();

  const loaded = React.useRef(false);

  React.useEffect(() => {
    if (!loaded.current && QuestionsData.status == "success") {
      loaded.current = true;
      resetScore.mutate({ QuizId: id, UserId: session.data!.user.id });
      setQuestions(QuestionsData.data);
      console.log("setou");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QuestionsData.status]);

  const newQuestion = () => {
    const nmb = Math.floor(Math.random() * Questions!.length);
    console.log(Questions, QuestionsData.data);
    setCurrentQuestion(Questions![nmb]);
    setQuestions((current) => {
      return current?.splice(nmb, 1);
    });
  };

  return (
    <>
      <Header name="A-ethan" />
      <GeralLayout session={session.data!}>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-black">
          {QuestionsData.isLoading
            ? LoadingScreen()
            : currentQuestion
            ? QuestionView()
            : startScreen()}
        </div>
      </GeralLayout>
    </>
  );

  function startScreen() {
    return (
      <button onClick={newQuestion} className="bg-green-500">
        A
      </button>
    );
  }

  function LoadingScreen() {
    return <Loading height="32em" width="32em" type={3} />;
  }
  function QuestionView() {
    return <div className="">a</div>;
  }
}

export default Home;
