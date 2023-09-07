import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { geralProps } from "~/libs/interfaces/geralProps";

interface props extends geralProps {
  show: boolean;
}

function UserProfile({ ...props }: props) {
  return (
    <Link
      className="flex scale-[0.975] items-center gap-x-2 rounded-full opacity-75 transition-all
    hover:scale-100 hover:bg-white/5 hover:opacity-100"
      href={"/profile/" + props.session.user.id}
    >
      <Image
        src={props.session.user.image!}
        alt="profile"
        width={40}
        height={40}
        className="h-12 w-12 flex-shrink-0 rounded-full"
      />
      {props.show && (
        <p className="font-semibold text-purple">{props.session.user.name}</p>
      )}
    </Link>
  );
}

export default UserProfile;
