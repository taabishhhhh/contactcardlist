import React from "react";

type Props = { children: React.ReactNode };

function Heading({ children }: Props) {
  return <h1 className='text-3xl font-bold text-black mb-5'>{children}</h1>;
}

export default Heading;
