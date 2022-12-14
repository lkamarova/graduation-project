import "../App.css";
import Banner from "./Banner";
import Bestsellers from "./catalog/Bestsellers";
import Catalog from "./catalog/Catalog";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Bestsellers />
            <Catalog />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
