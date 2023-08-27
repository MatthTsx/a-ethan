import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import SignProvider from "~/layout/providers/SignProvider";
import Fonts from "~/libs/setups/Fonts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  Fonts()
  return (
    <SessionProvider session={session}>
      <SignProvider>
        <Component {...pageProps} />
      </SignProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
