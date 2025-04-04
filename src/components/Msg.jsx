import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedEmail } from "../redux/appSlice";
import { motion } from "framer-motion";

const Message = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email.id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={openMail}
      className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
    >
      {/* Left Section (Icons & Recipient) */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <div className="flex-none text-gray-300">
          <MdCropSquare className="w-5 h-5" />
        </div>
        <div className="flex-none text-gray-300">
          <RiStarLine className="w-5 h-5" />
        </div>
        <h1 className="font-semibold whitespace-nowrap">{email?.to}</h1>
      </div>

      {/* Middle Section (Message Preview) */}
      <div className="flex-1 ml-4 overflow-hidden">
        <p className="text-gray-600 font-normal truncate inline-block max-w-[400px]">{`${
          email.message.length > 80
            ? `${email?.message.substring(0, 80)}...`
            : email.message
        }`}</p>
      </div>

      {/* Right Section (Date) */}
      <div className="flex-none text-gray-400 text-sm whitespace-nowrap">
        <p>
          {email?.createdAt?.seconds
            ? new Date(email.createdAt.seconds * 1000).toUTCString()
            : "Unknown Date"}
        </p>
      </div>
    </motion.div>
  );
};

export default Message;

/************************** */
{
  /* <div> */
  // import React from "react";
  // import { MdCropSquare } from "react-icons/md";
  // import { RiStarLine } from "react-icons/ri";
  // import { useNavigate } from "react-router-dom";
  // import { useDispatch } from "react-redux";
  // import { setSelectedEmail } from "../redux/appSlice";
  // import { motion } from "framer-motion";
  // const Msg = ({ email }) => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const openMail = () => {
  //     if (!email?.id) return;
  //     dispatch(setSelectedEmail(email));
  //     navigate(`/mail/${email.id}`);
  //   };
  //   return (
  //     <>
  //       {email && (
  //         <motion.div
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //           onClick={openMail}
  //           className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
  //         >
  //           {/* checkbox & star */}
  //           <div className="flex items-center gap-3">
  //             <div className="flex-none text-gray-300">
  //               <MdCropSquare className="w-5 h-5" />
  //             </div>
  //             <div className="flex-none text-gray-300">
  //               <RiStarLine className="w-5 h-5" />
  //             </div>
  //           </div>
  //           {/* text and all */}
  //           <div className="flex-1 ml-4">
  //             <p className="text-gray-600 truncate inline-block max-w-full">
  //               {email?.message || "No message"}
  //             </p>
  //           </div>
  //           <div className="flex-none text-gray-400 text-sm">
  //             <p>
  //               {email?.createdAt?.seconds
  //                 ? new Date(email.createdAt.seconds * 1000).toUTCString()
  //                 : "Unknown Date"}
  //             </p>
  //           </div>
  //         </motion.div>
  //       )}
  //     </>
  //   );
  // };
  // export default Msg;
}
// </div>

{
  /* <div> */
  // <motion.div
  //   initial={{ opacity: 0, y: -20 }}
  //   animate={{ opacity: 1, y: 0 }}
  //   transition={{ duration: 0.5 }}
  //   onClick={openMail}
  //   className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
  // >
  //   <div className="flex items-center gap-3">
  //     <div className="flex-none text-gray-300">
  //       <MdCropSquare className="w-5 h-5" />
  //     </div>
  //     <div className="flex-none text-gray-300">
  //       <RiStarLine className="w-5 h-5" />
  //     </div>
  //     <div>
  //       <h1 className="font-semibold">{email?.to}</h1>
  //     </div>
  //   </div>
  //   <div className="flex-1 ml-4 overflow-hidden">
  //     {/* <p className="text-gray-600 truncate inline-block max-w-full">{`${
  //       email.message.length > 130
  //         ? `${email?.message.substring(0, 130)}...`
  //         : email.message
  //     }`}</p> */}
  //     <p className="text-gray-600 truncate inline-block max-w-[200px]">{`${
  //       email.message.length > 80
  //         ? `${email?.message.substring(0, 80)}...`
  //         : email.message
  //     }`}</p>
  //   </div>
  //   <div className="flex-none text-gray-400 text-sm">
  //     <p>
  //       {email?.createdAt?.seconds
  //         ? new Date(email.createdAt.seconds * 1000).toUTCString()
  //         : "Unknown Date"}
  //     </p>
  //   </div>
  // </motion.div>
} // </div>
