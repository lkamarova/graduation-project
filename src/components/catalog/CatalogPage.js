import "../../App.css";
import Banner from "../Banner";
import Footer from "../Footer";
import Catalog from "./Catalog";

function CatalogPage() {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Catalog isSearch/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
