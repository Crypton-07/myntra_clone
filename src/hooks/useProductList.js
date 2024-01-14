/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { options, productUrl } from "../constants/constant";
import { addtoProductList } from "../utils/productSlice";
import { useEffect } from "react";

const useProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((store) => store?.product?.productList);
  const fetchproductList = async () => {
    const data = await fetch(productUrl, options);
    const json = await data.json();
    dispatch(addtoProductList(json?.products));
  };
  useEffect(() => {
    !productList && fetchproductList();
  }, []);
};

export default useProductList;

