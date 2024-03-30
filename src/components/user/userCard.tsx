import { getShortName } from "@/helper/getShortName";
import { UserInterface } from "@/interfaces";
import { CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMemo } from "react";
type Props = { user: UserInterface };

const UserCard = ({ user }: Props) => {
  let shortName = useMemo(() => {
    return getShortName(user.name);
  }, [user.name]);

  return (
    <div className='w-full flex justify-between items-center gap-3 hover:bg-gray-100'>
      <div className='flex justify-start items-center gap-3 w-[60%]'>
        <div>
          <Image
            width={100}
            height={100}
            alt={user.name}
            src={`https://placehold.co/100/2563eb/white?text=${shortName}`}
          />
        </div>
        <div className='flex-col gap-2'>
          <h3 className='text-black font-semibold text-lg'>
            {user.name}
            <span className='text-black text-sm font-normal  pl-3'>
              (@{user.username})
            </span>
          </h3>
          <p>
            <a
              href={"mailto:" + user.email}
              className='text-blue-600 text-sm  normal-case'
            >
              {user.email}
            </a>
          </p>
          <Link
            href={`/posts/${user.id.toString()}?username=${user.username} `}
          >
            <button className='rounded-full outline-none pl-4 py-[2px] border-2 flex justify-between items-center gap-3 text-black font-normal border-neutral-500'>
              Posts
              <CaretRight size={18} />
            </button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-2 items-baseline w-[40%]'>
        <p className='text-black font-normal'>Phone: {user.phone}</p>
        <p className='text-black font-normal'>Website: {user.website}</p>
        <Link href={user.id.toString()}>
          <button className='rounded-full outline-none pl-4 py-[2px] border-2 flex justify-between items-center gap-3 text-black font-normal border-neutral-500'>
            Details
            <CaretRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
