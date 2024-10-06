import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import Svg from "../../assets/svgs/Svg";
import Blogs from "../../components/UserComponent/Blogs";
import GroupChat from "../../components/UserComponent/GroupChat";
import BlockChecker from "../../services/BlockChecker";
import { useNavigate } from "react-router-dom";

const Community = () => {
  BlockChecker()
  const [active, setActive] = useState('chat'); 
  const navigate = useNavigate()

  
  const renderContent = () => {
    switch (active) {
      case 'blogs':
        return <Blogs />;
      case 'chat':
        return <GroupChat />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="w-full h-screen overflow-hidden">
        <section className="flex h-full w-full">
          <aside className="h-full w-20 bg-black flex flex-col justify-between items-center text-white">
            <div className="pt-10">
              <Svg />
            </div>
            <div className="relative flex flex-col items-center gap-10 h-1/2">
              <div 
                className={`relative group ${active === 'home' ? 'text-blue-400' : ''}`} 
                onClick={() => navigate('/')} 
              >
                <FaHome size={24} className="cursor-pointer" />
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded shadow-lg">
                  Home
                </div>
              </div>
              <div 
                className={`relative group ${active === 'blogs' ? 'text-blue-400' : ''}`} 
                onClick={() => setActive('blogs')} 
              >
                <MdMarkUnreadChatAlt size={24} className="cursor-pointer" />
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded shadow-lg">
                  Blogs
                </div>
              </div>
              <div 
                className={`relative group ${active === 'chat' ? 'text-blue-400' : ''}`} 
                onClick={() => setActive('chat')} 
              >
                <IoMdChatboxes size={24} className="cursor-pointer"/>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded shadow-lg">
                  Chat
                </div>
              </div>
            </div>

            <h1>Lou0t</h1>
          </aside>

          <section className="w-full h-full bg-gray-300  px-5 py-3 ">
            {renderContent()} 
          </section>
        </section>
      </main>
    </>
  );
};

export default Community;
