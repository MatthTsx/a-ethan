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
      <button
        onClick={() => {
          signIn("google").catch((err) => console.error(err));
        }}
      >
        Sign in
      </button>
    );
  }

  return props.children;
}

export default SignProvider;
