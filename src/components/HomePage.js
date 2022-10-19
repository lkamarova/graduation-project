import { useEffect, useState } from "react";
import { fetchBestsellers } from "../api";
import "../App.css";
import Banner from "./Banner";
import Bestsellers from "./catalog/Bestsellers";
import Catalog from "./catalog/Catalog";
import Footer from "./Footer";

function HomePage() {
  const [bestsellers, seBestsellers] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    
    if (!isCancelled) {
      getBestsellers();
    } 

    return () => {
      isCancelled = true;
    };
  }, []);

  const getBestsellers = () => {
    fetchBestsellers()
      .then((res) => seBestsellers(res))
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            {bestsellers?.length && <Bestsellers data={bestsellers} />}
            <Catalog />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
