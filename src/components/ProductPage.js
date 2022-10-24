import "../App.css";
import Banner from "./Banner";
import Footer from "./Footer";
import Product from "./Product";

function ProductPage() {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Product />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
