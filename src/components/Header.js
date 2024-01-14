/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { logoUrl } from "../constants/constant";
import {
  SearchOutlined,
  Person2Outlined,
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { ThreeCircles } from "react-loader-spinner";
import Spinner from "./Spinner";

const Header = () => {
  const cartItem = useSelector((store) => store?.cart?.cartItems);
  const wishlistItem = useSelector((store) => store?.cart?.wishlistItem);
  const user = useSelector((store) => store?.user);
  const [isPopUp, setIsPopUp] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoader(true);
    const timer = setTimeout(() => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          navigate("/error");
        });
    }, 1000);
    return () => {
      clearTimeout(timer);
      setLoader(false);
    };
  };

  useEffect(() => {
    setLoader(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        setLoader(false);
      } else {
        dispatch(removeUser());
        navigate("/");
        setLoader(false);
      }
    });
    return () => unsubscribe();
  }, [navigate, dispatch]);

  // if (loader) {
  //   return (
  //     <div className="absolute top-[45%] left-[45%] z-50">
  //       <ThreeCircles
  //         visible={true}
  //         height="100"
  //         width="100"
  //         color="#4fa94d"
  //         ariaLabel="three-circles-loading"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //       />
  //     </div>
  //   );
  // }

  return loader ? (
    <Spinner />
  ) : (
    <div className="py-3 px-4 flex items-center space-x-10 justify-around shadow-md fixed z-10 bg-slate-50 w-full">
      <div>
        {/* Logo */}
        <img className="w-14 h-auto" src={logoUrl} alt="logo" />
      </div>
      {/* ul and Li */}
      <ul className="flex space-x-8 items-center font-semibold cursor-pointer">
        <Link to={"/browse"}>
          <li className="hover:text-red-400 transition duration-150 ease-in">
            MEN
          </li>
        </Link>
        <li className="hover:text-red-400 transition duration-150 ease-in">
          WOMEN
        </li>
        <li className="hover:text-red-400 transition duration-150 ease-in">
          KIDS
        </li>
        <li className="hover:text-red-400 transition duration-150 ease-in">
          HOME & LIVING
        </li>
        <li className="hover:text-red-400 transition duration-150 ease-in">
          BEAUTY
        </li>
        <li className="hover:text-red-400 transition duration-150 ease-in">
          STUDIO
        </li>
      </ul>
      <div className="flex items-center space-x-2 bg-gray-200 px-2 shadow-md">
        <input
          className="w-96 px-2 py-2 focus:outline-none bg-transparent text-gray-600 placeholder:text-gray-500"
          type="text"
          placeholder="search your luxury..."
        />
        <SearchOutlined className="w-8 h-8 text-gray-500 cursor-pointer" />
      </div>
      <div className="flex items-center space-x-8 justify-end cursor-pointer font-medium text-sm">
        <div className="flex flex-col items-center relative">
          <FavoriteBorderOutlined className="!text-[25px] text-gray-700" />
          {wishlistItem?.length > 0 && (
            <span className="px-[6px] rounded-full absolute bottom-8 right-2 bg-red-400 text-white font-medium text-sm">
              {wishlistItem?.length}
            </span>
          )}
          <p>Whishlist</p>
        </div>
        <div className="flex flex-col items-center relative">
          <ShoppingBagOutlined className="!text-[25px] text-gray-700" />
          {(cartItem?.length > 0 && user) && (
            <span className="px-[6px] rounded-full absolute bottom-8 left-4 bg-red-400 text-white font-medium text-sm">
              {cartItem?.length}
            </span>
          )}
          <p>Bag</p>
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => setIsPopUp(!isPopUp)}
        >
          {user ? (
            <img
              className="w-7 h-7 rounded-sm"
              src={user?.photoURL}
              alt="user profile"
            />
          ) : (
            <Person2Outlined className="!text-[30px] text-gray-700" />
          )}
          <p>{user?.displayName}</p>
        </div>
        {isPopUp && user && (
          <div
            className={`${
              isPopUp ? "inline-block" : "hidden"
            } absolute top-[70px] right-0 w-44 h-screen flex flex-col space-y-2 bg-slate-200 p-2 rounded-sm !z-50`}
          >
            <p className="text-red-400 text-left text-lg">
              Hello, {user?.displayName}
            </p>
            <button
              className="text-center w-full border border-red-400 hover:bg-red-400 hover:text-white font-medium text-lg transition ease-linear rounded-sm active:scale-95"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
