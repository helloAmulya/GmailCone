import React, { useEffect, useMemo, useState } from "react";
import Msg from "./Msg";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const { emails = [], searchText = "" } = useSelector(
    (store) => store.appSlice
  );
  const [loading, setLoading] = useState(true);

  // Fetch emails from Firestore
  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setEmails(allEmails));
      setLoading(false);
    });

    return () => {
      unsubscribe();
      setLoading(false); // memory leak on unmount , preven this
    };
  }, [dispatch]);
 
  const filteredEmail = useMemo(() => {
    if (!searchText.trim()) return emails;

    const search = searchText.toLowerCase();
    return emails.filter(
      (email) =>
        email.subject?.toLowerCase().includes(search) ||
        email.to?.toLowerCase().includes(search) ||
        email.message?.toLowerCase().includes(search)
    );
  }, [searchText, emails]);

  return (
    <div>
      {loading ? (
        <p className="text-center text-3xl">
          <span className="text-gray-600 text-base">Loading emails</span>
          <span className="text-red-600">.</span>
          <span className="text-green-600">.</span>
          <span className="text-blue-600">.</span>
        </p>
      ) : filteredEmail.length > 0 ? (
        filteredEmail.map((email) => <Msg key={email.id} email={email} />)
      ) : (
        <p className="text-center text-gray-500 text-lg mt-5">
          No emails found
        </p>
      )}
    </div>
  );
};

export default Messages;
