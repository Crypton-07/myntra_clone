import { useSelector } from "react-redux";
import useBanner from "../hooks/useBanner";
import Banner from "./Banner";
import useProductList from "../hooks/useProductList";
import ProductList from "./ProductList";
import Header from "./Header";

const Browse = () => {
  useBanner();
  useProductList();

  const bannerImage = useSelector((store) => store?.banner?.banner);
  return (
    <div>
      <Header />
      <div className="relative top-24">
        <Banner bannerImage={bannerImage} />
        <ProductList />
      </div>
    </div>
  );
};

export default Browse;
