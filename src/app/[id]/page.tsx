"use client";
import Heading from "@/components/heading";
import UserDetailsForm from "@/components/user/userDetailsForm";

import { UserInterface } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  params: { id: string };
};

const UserDetail = ({ params: { id } }: Props) => {
  const [data, setData] = useState<UserInterface | null>(null)

  const getUserDetails = async (id: string) => {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${id}`);
    setData(resp.data)
  };

  useEffect(() => {
    getUserDetails(id)
  }, [])

  if (!data) {
    return <h1>User not found</h1>
  }
  return (
    <section>
      <Heading>User Details for @{data.username}</Heading>
      <UserDetailsForm userDetails={data} />
    </section>
  );
};

export default UserDetail;
