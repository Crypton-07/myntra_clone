/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { unsplash } from "../constants/unspalsh";
import { useDispatch, useSelector } from "react-redux";
import { addToBanner } from "../utils/bannerSlice";

const useBanner = () => {
  const dispatch = useDispatch();
  const isBanner = useSelector((store) => store?.banner?.banner);
  const randomPicture = async () => {
    const data = await unsplash.search.getPhotos({
      query: "shoes",
      page: 1,
      perPage: 5,
      orientation: "landscape",
    });
    const urls = data?.response?.results?.map((url) => url?.urls);
    dispatch(addToBanner(urls));
  };
  useEffect(() => {
    !isBanner && randomPicture();
  }, []);
};

export default useBanner;
