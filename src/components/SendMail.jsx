import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function SendMail() {
  const open = useSelector((store) => store.appSlice.open); // we use useSlector to access things from the store, any values
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "emails"), {
      // here the emails is taken as collection name, required in firebase
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
    });
    dispatch(setOpen(false));
    setFormData({
      to: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      className={`bg-white max-w-full shadow-xl rounded-t-md shadow-slate-600 ${
        open ? "block " : "hidden"
      }`}
    >
      <div className="flex px-3 py-2 bg-[#F2F6Fc] justify-between rounded-t-md">
        <h1> {formData.subject ? `${formData.subject}` : `New  Message`} </h1>

        <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <RxCross2 size={"20px"} onClick={() => dispatch(setOpen(false))} />

          {/* here the value of open from the store is set to false and the send mail closes */}
        </div>
      </div>

      <form className="flex flex-col p-3 gap-2" onSubmit={submitHandler}>
        <input
          value={formData.to}
          onChange={changeHandler}
          name="to"
          type="text"
          placeholder="Recipients"
          className="outline-none py-1"
        />
        <div className="w-full h-[1px] bg-gray-200"></div>

        <input
          value={formData.subject}
          onChange={changeHandler}
          name="subject"
          type="text"
          placeholder="Subject"
          className="outline-none py-1"
        />
        <div className="w-full h-[1px] bg-gray-200"></div>

        <textarea
          value={formData.message}
          onChange={changeHandler}
          name="message"
          cols={"30"}
          rows={"10"}
          className="outline-none py-1"
        ></textarea>
        <button
          className="rounded-full w-fit bg-[#0B57D0] px-4 text-white font-medium"
          type="submit"
          onClick={() => dispatch(setOpen(false))}
        >
          Send
        </button>
      </form>

      {/* main div */}
    </div>
  );
}

export default SendMail;
