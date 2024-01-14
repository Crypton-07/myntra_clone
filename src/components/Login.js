/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import {} from "@mui/material";
import { cehckValidate } from "../utils/validate";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { USER_AVATAR } from "../constants/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(false);
  const [loader, setLoader] = useState(false);
  // console.log(isSignin);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const userEmail = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const message = cehckValidate(
      name?.current?.value,
      userEmail?.current?.value,
      password?.current?.value
    );
    setErrorMessage(message);
    if (message) return;
    if (isSignin) {
      try {
        setLoader(true);
        createUserWithEmailAndPassword(
          auth,
          userEmail?.current?.value,
          password?.current?.value
        ).then((userCredentials) => {
          updateProfile(userCredentials?.user, {
            displayName: name?.current?.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            const { uid, displayName, email, photoURL } = userCredentials?.user;
            dispatch(
              addUser({
                uid: uid,
                displayName: displayName,
                email: email,
                photoURL: photoURL,
              })
            );
          });
        });
      } catch (error) {
        alert(error);
      }
      setLoader(false);
    } else {
      try {
        setLoader(true);
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          userEmail?.current?.value,
          password?.current?.value
        );
        console.log(userCredentials?.user);
        setLoader(false);
      } catch (error) {
        console.log(error);
        navigate("/");
        setLoader(false);
      }
    }
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCredentials) => {
        const credential =
          GoogleAuthProvider.credentialFromResult(userCredentials);
        // const token = credential.accessToken;
        const user = userCredentials?.user;
        console.log(user);
      })
      .catch((err) => {
        const errorMsg = err?.message;
        const errorCode = err?.code;
        setErrorMessage(errorCode + "-" + errorMsg);
      });
  };

  // if (loader) {
  //   return (
  // <div className="absolute top-1/2 left-1/2 z-50">
  //   <ThreeCircles
  //     visible={true}
  //     height="100"
  //     width="100"
  //     color="#4fa94d"
  //     ariaLabel="three-circles-loading"
  //     wrapperStyle={{}}
  //     wrapperClass=""
  //   />
  // </div>
  //   );
  // }

  // console.log(name?.current?.value);
  return (
    <div>
      <Header />
      {loader ? (
        <Spinner />
      ) : (
        <div className="bg-pink-100 h-screen w-screen flex justify-center items-center antialiased">
          <form
            className="w-[400px] bg-white rounded-md pb-5 shadow-md"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="font-bold text-2xl px-5 py-2">
              {isSignin ? "Sign In" : "Log In"}
            </h1>
            <div className="flex flex-col space-y-5 justify-center px-5 mt-6">
              {isSignin && (
                <input
                  ref={name}
                  className="p-2 bg-gray-50 border-b-red-400 border-b-[1px] focus:outline-none rounded-sm shadow-md "
                  type="text"
                  placeholder="Name"
                  autoComplete="new-password"
                />
              )}
              <input
                ref={userEmail}
                className="p-2 bg-gray-50 border-b-red-400 border-b-[1px] focus:outline-none rounded-sm shadow-md "
                type="text"
                placeholder="Email"
                autoComplete="new-password"
              />

              <input
                ref={password}
                className="p-2 bg-gray-50 border-b-red-400 border-b-[1px] focus:outline-none rounded-sm shadow-md "
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              {errorMessage && (
                <p className="text-red-500 font-medium text-md py-2 w-full">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className="text-center p-1 w-full border border-red-400 hover:bg-red-400 hover:text-white font-medium text-lg transition ease-linear rounded-sm active:scale-95 mt-10"
                onClick={handleLogin}
              >
                {isSignin ? "Sign up" : "Log in"}
              </button>
              <p className="text-center">
                {isSignin ? "Already an user?. " : "Don't have an account?. "}
                <span
                  className="text-red-400 cursor-pointer"
                  onClick={() => {
                    setIsSignIn(!isSignin);
                    setErrorMessage(null);
                  }}
                >
                  {isSignin ? "Log in" : "Sign up"}
                </span>
              </p>
              <p className="border border-black"></p>
              <button
                type="submit"
                className="p-1 w-full border border-red-400 hover:bg-red-400 hover:text-white font-medium text-lg transition ease-linear rounded-sm active:scale-95 flex items-center justify-center space-x-2"
                onClick={loginWithGoogle}
              >
                <img
                  className="w-4 h-4"
                  src="/icons/google.png"
                  alt="google icon"
                />
                <span>Log in with google</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
