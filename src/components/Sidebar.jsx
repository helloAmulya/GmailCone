import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineWatchLater,
} from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { GrTrash } from "react-icons/gr";
// import { IoMdStar } from "react-icons/io";

import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";

function Sidebar() {

  const sideItems = [
    {
      icon: <LuPencil size="24px" />,
      text: "Inbox",
    },
    {
      icon: <RiStarLine size="24px" />,
      text: "Starred",
    },
    {
      icon: <MdOutlineWatchLater size="24px" />,
      text: "Snoozed",
    },
    {
      icon: <TbSend2 size="24px" />,
      text: "Drafts",
    },
    {
      icon: <MdOutlineKeyboardArrowDown size="24px" />,
      text: "More",
    },
    // {
    //   icon: <MdOutlineDrafts size="24px" />,
    //   text: "All Mail",
    // },
    // {
    //   icon: <GrTrash size="24px" />,
    //   text: "Trash",
    // },
  ];

  // const [open, setOpen] = useState(false); // this is local state variable, now we use redux

  // const navigate = useNavigate();
  // const openModal= () =>{
  //   navigate("/SendMail")
  // }

  const dispatch = useDispatch();

  return (
    <div className="w-[15%] text-[15px] leading-5">
      <div className="p-3">
        <button
          className="flex items-center gap-2 p-4 rounded-2xl hover:shadow-xl bg-[#C2E7FF]"
          onClick={() => dispatch(setOpen(true))}
        >
          <LuPencil size="24px" />
          Compose
        </button>
      </div>

      {/* below buttons */}
      <div className="text-gray-500 hover:cursor-pointer">
        {sideItems.map((item, index) => {
          return (
            <div className="flex items-center gap-4 pl-6 py-1 rounded-r-full my-2 hover:bg-gray-200 ">
              {item.icon}
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
