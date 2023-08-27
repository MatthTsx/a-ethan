import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import Search from "~/layout/components/Home/Search";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";

export default function Home() {
  const session = useSession()
  const [SearchValue, setSearchValue] = React.useState("")

  return (
    <>
      <Header name = "A-ethan"/>
        <GeralLayout session = {session.data as Session}>
            <div className="w-full h-full bg-black rounded-md flex flex-col items-center">
              <Search/>
              <div className="bg-blue-500 w-full h-full p-4 overflow-y-scroll">
                
              </div>
            </div>
        </GeralLayout>
    </>
  );
}
