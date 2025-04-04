import React, { useState } from "react";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import {
  IoMdMore,
  IoMdRefresh,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { GoTag } from "react-icons/go";
import Messages from "./Messages";

function Inbox() {
  const mailType = [
    {
      icon: <MdInbox size="20px" />,
      text: "Primary",
    },
    {
      icon: <GoTag size="20px" />,
      text: "Promotions",
    },
    {
      icon: <FaUserFriends size="20px" />,
      text: "Social",
    },
    {
      icon: <IoIosInformationCircleOutline size="20px" />,
      text: "Updates",
    },
  ];

  const [mail, setmail] = useState(0);

  return (
    // {/* <div className="flex-1 bg-white rounded-2xl mx-5 "> */}
    <div className="flex-1 bg-white rounded-xl  ml-9 ">
      <div className="flex items-center justify-between px-4">
        {/* left Icons */}
        <div className="flex items-center gap-2 py-2 text-gray-700">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20px"} />
            <FaCaretDown size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100  cursor-pointer">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 ">
            <IoMdMore size={"20px"} />
          </div>
        </div>

        {/* right Icons */}
        <div className="flex items-center gap-2 ">
          <p className="text-sm text-gray-500 ">1-50 of 500 </p>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowLeft size={"20px"} className="text-gray-500" />
          </button>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowRight size={"20px"} />
          </button>
        </div>
      </div>

      {/* primary tabs */}
      <div className="h-[90vh] overflow-y-auto text-sm ">
        <div className="flex items-center gap-1">
          {mailType.map((item, index) => {
            return (
              <button
                className={`${
                  mail === index
                    ? "border-b-[3px] border-blue-600 text-blue-600"
                    : "border-none"
                } w-52 hover:bg-gray-100 flex items-center gap-5 p-4 mr-10`}
                key={index}
                onClick={() => {
                  setmail(index);
                }}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
        <Messages />
      </div>

      {/* main div */}
    </div>
  );
}

export default Inbox;
