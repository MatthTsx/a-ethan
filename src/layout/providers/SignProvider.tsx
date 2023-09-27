import { signIn, useSession } from "next-auth/react";
import React from "react";

interface props {
  children: React.ReactNode;
}

function SignProvider({ ...props }: props) {
  const session = useSession();

  if (session.status == "loading") return <>Loading</>;

  if (!session.data?.user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
      <button
        onClick={() => {
          signIn("google").catch((err) => console.error(err));
        }}
        className={"bg-lightGolden flex items-center justify-center shadow-lg px-8 p-4 rounded-full hover:scale-105 transition-all"}
      >
        Sign in
      </button>
      </div>
    );
  }

  return props.children;
}

export default SignProvider;
