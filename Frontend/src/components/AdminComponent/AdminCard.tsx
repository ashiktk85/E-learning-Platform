import React from 'react';
import { Interface } from 'readline';

interface ICard {
  name : string,
  data : number
}

const AdminCard : React.FC<ICard> = ({name ,data}) => {
  return (
    <div className="relative overflow-hidden w-40 h-40 rounded-3xl cursor-pointer text-2xl font-bold bg-purple-400">
      <div className="z-10 absolute w-full h-full peer"></div>
      <div
        className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-purple-300 transition-all duration-500"
      ></div>
      <div
        className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-purple-300 transition-all duration-500"
      >
        {data}
      </div>
      <div className="w-full h-full items-center justify-center flex uppercase">
        {name}
      </div>
    </div>
  );
}

export default AdminCard;
