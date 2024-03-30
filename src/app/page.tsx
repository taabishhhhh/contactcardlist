"use client";
import Heading from "@/components/heading";
import UserCard from "@/components/user/userCard";
import { filterUsers } from "@/helper/filterData";
import { UserInterface } from "@/interfaces";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  async function getUsers() {
    setLoading(true);
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`);
    setData(resp.data);
    setFilteredUsers(resp.data);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setLoading(true)
    if (query) {
      setFilteredUsers(filterUsers(data, query));
    } else {
      setFilteredUsers(data);
    }
    setLoading(false)
  }, [query, data]);

  if (loading) {
    return <h1>Fetching users</h1>
  }

  return (
    <section className='mt-10'>
      <Heading>User Card Lists</Heading>
      <div className='grid grid-cols-2 gap-5'>
        <div className='col-span-2'>
          <input
            placeholder='Search...'
            className='outline-none border px-6 py-2 bg-gray-100 text-gray-800'
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>
        {filteredUsers
          .slice(currentPage * 8, (currentPage + 1) * 8)
          .map((item) => (
            <UserCard user={item} key={item.id} />
          ))}
      </div>
      <div className='flex justify-between items-center w-full mt-16'>
        <button
          title='Previous Page'
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
          className='flex justify-center items-center disabled:opacity-50 bg-black text-white w-12 h-12 rounded-full'
        >
          <CaretLeft size={32} weight='bold' />
        </button>
        <button
          title='Next Page'
          disabled={(currentPage + 1) * 8 > filteredUsers.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className='flex justify-center items-center disabled:opacity-50 bg-black text-white w-12 h-12 rounded-full'
        >
          <CaretRight size={32} weight='bold' />
        </button>
      </div>
    </section>
  );
}
