import Heading from "@/components/heading";
import { PostInterface } from "@/interfaces";
import axios from "axios";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { username: string };
};
const getPosts = async (id: string): Promise<PostInterface[]> => {
  const resp = await axios.get(`${process.env.BASE_API_URL}/posts?userId=${id}`)
  return resp.data;
}
const Posts = async ({ params: { id }, searchParams: { username } }: Props) => {
  const data = await getPosts(id);
  return (
    <section>
      <Heading>User Posts of @{username}</Heading>
      <div className='flex flex-col gap-5'>
        {data.map((item: PostInterface) => (
          <div
            key={item.id}
            className='p-5 rounded-lg border border-gray-200 shadow hover:bg-gray-100'
          >
            <h4 className='text-black font-semibold text-2xl'>{item.title}</h4>
            <p className='text-gray-700 font-normal'>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
