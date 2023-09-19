import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
  const Quizzes = api.profile.getQuizes.useQuery({ userId: id });
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

        <div className="flex h-full w-full flex-col p-4">
          {Quizzes.data?.map((q) => QuizView(q))}
        </div>
      </div>
    );
  }

  function img_(src: string) {
    return (
      <Image
        width={100}
        height={100}
        src={src}
        alt="profile"
        className="h-12 w-12 rounded-xl object-cover object-center "
      />
    );
  }

  function QuizView({
    Image,
    Name,
    id,
    tags,
    Description,
  }: {
    Image: string | null;
    Name: string;
    id: string;
    tags: {
      Color: string;
      Tittle: string;
    }[];
    Description: string | null;
  }) {
    return (
      <Link
        href={`/QuizProfile/${id}`}
        key={id}
        className="flex w-full flex-col rounded-md bg-darkPurple px-4 py-2"
      >
        <div className="flex items-center gap-4 text-sm text-purple">
          <div className="h-2 w-2 rounded-full bg-lightGolden" />
          {img_(Image!)}
          <p className="text-lg font-semibold text-lightGolden">{Name}</p>
          <p className="w-[75%] rounded-md bg-black/40 p-1">
            {Description?.slice(0, 100)}
            {Description!.length >= 100 && "..."}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 p-2">
          {tags.map((data, i) => (
            <div
              className={`group flex h-fit w-fit flex-shrink-0 cursor-default items-center gap-2 rounded-md bg-neutral-900 p-1 px-2 text-sm font-semibold text-lightGolden`}
              key={i}
            >
              <div
                style={{ backgroundColor: "rgb(" + data.Color + ")" }}
                className="h-2 w-2 rounded-full"
              />
              {data.Tittle}
            </div>
          ))}
        </div>
      </Link>
    );
  }
}

export default User;
