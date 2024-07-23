import React from "react";

interface UserButtonProps {
  name : string
}

const UserButton : React.FC<UserButtonProps> = ({name}) => {
  return (
    <div>
     <button type="submit" className="w-28 bg-spotify-green text-white py-2 rounded font-bold">{name}</button>
    </div>
  );
};

export default UserButton;
