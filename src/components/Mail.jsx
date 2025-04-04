import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
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
      className="flex-1 rounded-xl bg-white mx-5"
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

      <div className="h-[90vh] overflow-y-auto p-4 ">
        <div className="flex items-center justify-between gap-1 bg-white">
          <div className="gap-2 flex items-center">
            <h1 className="text-xl font-medium">{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">Inbox</span>
          </div>

          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>
              {/* {new Date(selectedEmail?.createdAt?.seconds * 1000).toUTCString()} */}
              {selectedEmail?.createdAt?.seconds
                ? new Date(selectedEmail.createdAt.seconds * 1000).toUTCString()
                : "Unknown Date"}
            </p>
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div>
        <div className="my-10">
          <p>{selectedEmail?.message}</p>
        </div>
      </div>

      {/* main div */}
    </motion.div>
  );
}

export default Mail;
