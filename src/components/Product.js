import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "../utils/cartSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Product = ({ productList }) => {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  //   console.log(productList);
  const handleClick = (e) => {
    setIsFav(!isFav);
  };
  const handleAddItem = (prod) => {
    dispatch(addToCart(prod));
  };
  const addWishlist = (prod) => {
    dispatch(addToWishlist(prod));
  };
  const removeWishlist = (prod) => {
    dispatch(removeFromWishlist(prod));
  };
  return (
    <div className="flex flex-wrap gap-3 items-center justify-start mx-2 space-y-2">
      {productList.map((prod) => (
        <div
          key={prod?.id}
          className="w-[240px] h-[410px] py-1 border border-red-300 flex flex-col space-y-1 justify-start items-center bg-slate-50 shadow-md rounded-md"
        >
          <img
            className="w-full h-[200px] object-cover p-1"
            src={"https://" + prod?.imageUrl}
            alt="productimage"
          />
          <p className="px-2 font-bold text-center text-gray-800 tracking-wide">
            {prod?.brandName}
          </p>
          <p className="px-2 font-medium text-sm text-center text-gray-600 text-wrap w-full h-[60px]">
            {prod?.name}
          </p>
          <p className="font-medium text-gray-600 text-sm my-1">
            Colour : {prod?.colour}
          </p>
          <p className="font-bold px-2 text-center text-red-500 py-1">
            {prod?.price?.current?.text}
          </p>
          <div className="w-full h-10 flex justify-center items-center">
            <button className="px-2 border w-[90%] border-black font-semibold uppercase tracking-wide rounded-md  hover:bg-black hover:text-white transition ease-in duration-150">
              Wishlist
              <span className="mx-2 text-sm" onClick={handleClick}>
                {isFav ? (
                  <Favorite
                    className="text-red-400"
                    onClick={() => removeWishlist(prod)}
                  />
                ) : (
                  <FavoriteBorder onClick={() => addWishlist(prod)} />
                )}
              </span>
            </button>
          </div>
          <button
            className="px-2 text-center w-[90%] h-full bg-white border border-red-400 font-semibold uppercase tracking-wide text-red-400 rounded-md hover:bg-red-400 hover:text-white transition ease-in duration-150"
            onClick={() => handleAddItem(prod)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
