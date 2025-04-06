import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import { LuReply } from "react-icons/lu";
import { IoReturnUpForward } from "react-icons/io5";

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdWatchLater,
} from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

function Mail() {
  const navigate = useNavigate();
  const { selectedEmail } = useSelector((store) => store.appSlice);

  // delete mail function
  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    } catch (error) {
      console.log("Error in Mail Delete function :: ", error);
    }
  };

  // const params = useParams()
  // we can also pass this in the delete button to delete the mail but prefer selectedEmail.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 rounded-xl bg-white ml-9"
    >
      {/* symbols div */}
      <div className="flex items-center justify-between px-4">
        {/* left side icons */}
        <div className="flex items-center text-gray-700 py-2 gap-2">
          <div
            className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoMdArrowBack size={"20px"} />
          </div>
          <div className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer">
            <BiArchiveIn size={"20px"} />
          </div>
          <div className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer">
            <MdOutlineReport size={"20px"} />
          </div>
          <div
            className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer"
            //  onClick={() => deleteMailById(params.id)}>
            onClick={() => deleteMailById(selectedEmail.id)}
          >
            <MdDeleteOutline size={"20px"} />
          </div>
          <div className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer">
            <MdOutlineMarkEmailUnread size={"20px"} />
          </div>

          <div className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer">
            <MdOutlineDriveFileMove size={"20px"} />
          </div>
          <div className="p-2 rounded-full hoer:bg-gray-100 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        {/* right side arrow icons */}
        <div className="flex items-center gap-2">
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowLeft size={"20px"} className="text-gray-500" />
          </button>
          <button className="hover:rounded-full hover:bg-gray-100">
            <MdKeyboardArrowRight size={"20px"} />
          </button>
        </div>
        {/* Symbols ends here */}
      </div>

      <div className="h-[90vh] overflow-y-auto p-4  ">
        <div className="flex items-center justify-between gap-1 bg-white ">
          <div className="gap-2 flex items-center ml-10">
            <h1 className="text-xl text-[#1F1F1F] ">
              {selectedEmail?.subject}
            </h1>
            <span className="text-sm text-gray-500 bg-gray-200 rounded-[4px] px-2">
              Inbox
            </span>
          </div>

          <div className="flex-none text-[#5e5e5ecc] my-5 mr-10 text-sm">
            <p>
              {/* {new Date(selectedEmail?.createdAt?.seconds * 1000).toUTCString()} */}
              {selectedEmail?.createdAt?.seconds
                ? new Date(selectedEmail.createdAt.seconds * 1000).toUTCString()
                : "Unknown Date"}
            </p>
          </div>
        </div>

        <div className="text-gray-500 text-sm ml-10">
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div>
        <div className="whitespace-pre-wrap text-gray-700 m-10">
          {selectedEmail?.message}
        </div>

        {/* bottom  buttons */}
        <div className="flex items-center justify-start gap-2 bg-white p-4 ml-5">
          <div className="flex flex-row justify-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-[#F2F2F2] border border-[#747775]">
            <LuReply />
            <button className="text-sm">Reply</button>
          </div>

          <div className="flex flex-row justify-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-[#F2F2F2] border border-[#747775]">
            <button className="text-sm">Forward</button>
            <LuReply className="transform scale-x-[-1]" />
          </div>
        </div>
      </div>

      {/* main div */}
    </motion.div>
  );
}

export default Mail;
