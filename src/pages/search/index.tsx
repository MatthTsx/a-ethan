import { useSession } from "next-auth/react";
import React from "react";
import Search from "~/layout/components/Search/Search";
import ShowQuizzes from "~/layout/components/Search/ShowQuizzes";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";

export default function Home() {
  const session = useSession();
  const [SearchValue, setSearchValue] = React.useState("a");

  return (
    <>
      <Header name="A-ethan" />
      <GeralLayout session={session.data!}>
        <div className="flex h-full w-full flex-col items-center rounded-md bg-black">
          <Search setText={setSearchValue} />
          <div className="my-4 h-0.5 w-[75%] bg-neutral-900" />
          <ShowQuizzes SearchValue={SearchValue} />
        </div>
      </GeralLayout>
    </>
  );
}
