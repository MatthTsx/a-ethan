import { useSession } from "next-auth/react";
import React from "react";
import MainCreate from "~/layout/components/Create/MainCreate";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";

function Home() {
  const session = useSession();

  return (
    <>
      <Header name="A-ethan" />
      <GeralLayout session={session.data!}>
        <MainCreate
          UserId={session.data?.user.id ?? ""}
          userName={session.data?.user.name ?? ""}
        />
      </GeralLayout>
    </>
  );
}

export default Home;
