// import { signInWithPopup } from "firebase/auth";
// import React from "react";
// import GoogleButton from "react-google-button";
// import { auth, provider } from "../firebase";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/appSlice";

// function Login() {
//   const dispatch = useDispatch();
//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       dispatch(
//         setUser({
//           displayName: result.user.displayName,
//           email: result.user.email,
//           photoURL: result.user.photoURL,
//         })
//       );
//     } catch (error) {
//       console.log("Login Function error :: ", error);
//     }
//   };
//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
//       <div className="p-8 bg-white flex flex-col gap-3 rounded-md">
//         <h1 className="text-center text-xl font-medium mb-5">
//           Login
//           <GoogleButton onClick={signInWithGoogle} />
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { signInWithPopup } from "firebase/auth";
import React from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/appSlice";

function Login() {
  const dispatch = useDispatch();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(
        setUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
      );
    } catch (error) {
      console.log("Login Function error :: ", error);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 bg-white/30 backdrop-blur-lg flex flex-col gap-5 rounded-xl shadow-2xl border border-white/40 w-96 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
        <p className="text-gray-600 text-sm">
          Use your Google account to continue
        </p>
        <div className="flex justify-center">
          <GoogleButton onClick={signInWithGoogle} />
        </div>
        <p className="text-xs text-gray-500 mt-4">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-500">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Login;
