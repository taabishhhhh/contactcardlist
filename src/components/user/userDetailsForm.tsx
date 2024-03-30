import { UserInterface } from "@/interfaces";
import React from "react";
import TextInput from "@/components/inputs/textInput";
import Textarea from "@/components/inputs/textarea";
import { getShortName } from "@/helper/getShortName";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

type Props = {
  userDetails: UserInterface;
};

const UserDetailsForm = ({ userDetails }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: userDetails,
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${data.id}`,
        data
      );
      toast.success("User updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong! try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-5 gap-6 mt-10'>
        <div>
          <Image
            width={200}
            height={200}
            alt={userDetails.name}
            src={`https://placehold.co/200/2563eb/white?text=${getShortName(
              userDetails.name
            )}`}
          />
        </div>
        <div className='col-span-4 grid grid-cols-2 gap-36'>
          <div className='flex flex-col gap-8'>
            <TextInput
              label='Name'
              errors={errors["name"]}
              register={register("name", {
                required: "Name is required.",
              })}
            />
            <TextInput
              label='Email Address'
              type='email'
              errors={errors["email"]}
              register={register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
            />
            <TextInput
              label='Username'
              errors={errors["username"]}
              register={register("username", {
                required: "Username is required.",
              })}
            />
            <Textarea
              label='Address'
              errors={errors["address"] && errors["address"]["street"]}
              register={register("address.street", {
                required: "Address is required.",
              })}
            ></Textarea>
          </div>
          <div className='flex flex-col gap-8'>
            <TextInput
              label='Company'
              errors={errors["company"] && errors["company"]["name"]}
              register={register("company.name", {
                required: "Company is required.",
              })}
            />
            <TextInput
              label='Industry'
              errors={errors["company"] && errors["company"]["bs"]}
              register={register("company.bs", {
                required: "Industry Phrase is required.",
              })}
            />
            <Textarea
              label='Catch Phrase'
              errors={errors["company"] && errors["company"]["catchPhrase"]}
              register={register("company.catchPhrase", {
                required: "Catch Phrase is required.",
              })}
            ></Textarea>
            <button
              disabled={isSubmitting}
              type='submit'
              className='disabled:opacity-50 outline-none w-full rounded-full uppercase font-bold text-white bg-[#7386c6] py-5 text-lg'
            >
              {isSubmitting ? "UPDATING..." : "UPDATE"}
            </button>
          </div>
        </div>
      </div>
      <Toaster richColors position='bottom-center' />
    </form>
  );
};

export default UserDetailsForm;
