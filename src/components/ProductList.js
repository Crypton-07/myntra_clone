import React from "react";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import Product from "./Product";

const ProductList = () => {
  const productList = useSelector((store) => store?.product?.productList);

  return (
    <div className="my-2">
      <h1 className="font-bold text-2xl text-center my-2 py-2 w-full border-b-2 shadow-sm">
        Top Shoes
      </h1>
      {!productList ? <Shimmer /> : <Product productList={productList} />}
    </div>
  );
};

export default ProductList;
