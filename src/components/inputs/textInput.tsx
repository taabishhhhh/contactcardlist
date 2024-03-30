import React, { useId } from "react";

type Props = {
  label: string;
  name?: string;
  value?: string;
  type?: string;
  [key: string]: any;
};

const TextInput = ({ label, name, type = "text", register, errors }: Props) => {
  let id = useId();

  return (
    <div className=' flex flex-col'>
      <label htmlFor={id} className='font-bold text-lg text-black mb-2'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className='outline-none px-6 py-4 text-black text-base bg-neutral-200'
        {...register}
      />
      {errors && <p className='text-red-500'>{errors.message}</p>}
    </div>
  );
};

export default TextInput;
