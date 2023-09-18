import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Loading from "~/layout/components/utils/Loading";
import Header from "~/layout/layout/Header";
import GeralLayout from "~/layout/layout/geralLayout";
import { api } from "~/utils/api";
// import sleep from "~/utils/scripts/sleep";

function User() {
  const session = useSession();
  const id = useRouter().asPath.replace("/profile/", "");
  const user = api.profile.getProfile.useQuery({ id });
  // const isSame = id == session.data?.user.id;

  // useEffect(() => {
  //   if(user.status == "loading" || !loading) return
  //   // setLoading(false)
  //   // sleep(750).then(() => setLoading(false))
  // }, [user])

  return (
    <>
      <Header name="AE - profile" />
      <GeralLayout session={session.data!}>
        <div className="h-full w-full rounded-md bg-black p-4">
          <Main />
        </div>
      </GeralLayout>
    </>
  );

  function Main() {
    return (
      <div className="flex h-full w-full gap-4">
        <div className="flex h-full w-[30%] flex-shrink-0 flex-col gap-2 rounded-md">
          {user.status == "loading" ? (
            <Loading width="100%" height="9rem" type={1} />
          ) : (
            <div
              className="flex h-36 w-full scale-[0.975] items-center gap-4 rounded-md bg-gradient-to-tr
          from-neutral-900/60 to-neutral-900 p-2 opacity-70
          transition-all hover:scale-100 hover:opacity-100"
            >
              <Image
                width={75}
                height={75}
                src={user.data!.image!}
                alt="profile"
                className="h-24 w-24 rounded-xl object-contain"
              />
              <p className="text-xl font-semibold text-lightGolden">
                {user.data!.name!}
              </p>
            </div>
          )}

          {user.status == "loading" ? (
            <Loading height="100%" width="100%" type={2} />
          ) : (
            <div
              className="flex h-full w-full scale-[0.975] gap-4 rounded-md bg-gradient-to-tr from-neutral-900/60
          to-neutral-900 p-2 opacity-70
          transition-all hover:scale-100 hover:opacity-100"
            >
              <p className="text-black">AAdjawjd</p>
            </div>
          )}
        </div>

        <div className="h-full w-full bg-blue-500">User</div>
      </div>
    );
  }
}

export default User;
