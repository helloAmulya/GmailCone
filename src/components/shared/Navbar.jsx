import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from "react-avatar";

import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../../redux/appSlice";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Navbar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector((store) => store.appSlice);
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log("signOutHandler is having error :: ", error);
      });
  };

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input]);

  return (
    // <div className="flex items-center jusitfy-between h-16 mx-3">
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          {/* hamburger menu */}
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxHamburgerMenu size={"20px"} />
          </div>
          {/* symbol */}
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png"
            alt="Gmail Logo"
            className="h-10"
          />
          {/*  */}
        </div>
      </div>

      <div className="md:block hidden w-[70%] lg:ml-36 mr-80">
        {/* search bar */}
        <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
          <IoIosSearch size={"24px"} className="text-gray-700" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-full w-full bg-transparent outline-none px-2 placeholder-gray-600"
            placeholder="Search mail"
          />
        </div>
      </div>

      {/*right side symbols */}
      <div className=" md:block hidden">
        <div className="flex items-center gap-1">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <AiOutlineQuestionCircle size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoSettingsOutline size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"20px"} />
          </div>

          <div className="cursor-pointer relative">
            <Avatar
              // src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
              src={user?.photoURL}
              size={"40"}
              round={true}
              onClick={() => setToggle(!toggle)}
            />

            <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-2 z-20 shadow-xl bg-white rounded-md border border-gray-300"
                >
                  <p
                    className="px-4 py-2 text-red-500 cursor-pointer font-medium hover:text-red-600 transition duration-200"
                    onClick={signOutHandler}
                  >
                    Logout
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <SignOut /> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
