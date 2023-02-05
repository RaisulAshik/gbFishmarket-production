import Layout from "../Common/Layout";
import LocalMap from "./components/LocalMap";
import IntroAbout from "./components/IntroAbout";
import DiscoverProducts from "./components/DiscoverProducts";
import { IlocationProps } from "../../utils/interfaces";
import Carosal from "./components/Carosal";
import Announcement from "./components/Announcement";
import OthersCompany from "./components/OthersCompany";

const Home = () => {
  const locationStatic: IlocationProps = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 23.822665367994194,
    lng: 90.37948960457562,
  };
  return (
    <Layout title="Home">
      <div className="font-montserrat">
        <Carosal />
        <IntroAbout />
        <DiscoverProducts />
        <Announcement />
        <LocalMap location={locationStatic} zoomLevel={1} />
        <OthersCompany/>
      </div>
    </Layout>
  );
};

export default Home;
