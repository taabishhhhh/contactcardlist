import React, { useId } from "react";

type Props = {
  label: string;
  name?: string;
  value?: string;
  rows?: number;
  cols?: number;
  [key: string]: any;
};

const Textarea = ({
  label,
  name,
  rows = 3,
  cols = 100,
  register,
  errors,
}: Props) => {
  let id = useId();

  return (
    <div className=' flex flex-col'>
      <label htmlFor={id} className='font-bold text-lg text-black mb-2'>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        cols={cols}
        name={name}
        className='outline-none px-6 py-4 text-black text-base bg-neutral-200'
        {...register}
      ></textarea>
      {errors && <p className='text-red-500'>{errors.message}</p>}
    </div>
  );
};

export default Textarea;
