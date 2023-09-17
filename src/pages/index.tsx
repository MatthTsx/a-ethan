import { useSession } from "next-auth/react";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";

export default function Home() {
  const session = useSession();

  return (
    <>
      <Header name="A-ethan" />
      <GeralLayout session={session.data!}>
        <div className="flex h-full w-full flex-col items-center rounded-md bg-black"></div>
      </GeralLayout>
    </>
  );
}
