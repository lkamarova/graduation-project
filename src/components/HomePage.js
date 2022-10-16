import "../App.css";
import Banner from "./Banner";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col">
            <Banner />
            <section class="top-sales">
              <h2 class="text-center">Хиты продаж!</h2>
              <div class="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </section>
            <section class="catalog">
              <h2 class="text-center">Каталог</h2>
              <div class="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
