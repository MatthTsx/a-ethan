import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession()

  return (
    <>
      <Header name = "A-ethan"/>
        <GeralLayout session = {session.data as Session}>
            <div className="w-full h-full bg-black rounded-md flex flex-col items-center">
            </div>
        </GeralLayout>
    </>
  );
}
