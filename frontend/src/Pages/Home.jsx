import HomeBanner from "../Components/BannerHome";
import CategoriesHome from "../Components/CategoriesHome";
import ComingSoonWatchesPage from "../Components/ComingSoonWatchesPage";
import FashionPage from "../Components/FashionPage";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <CategoriesHome />
      <ComingSoonWatchesPage />
      <FashionPage />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;