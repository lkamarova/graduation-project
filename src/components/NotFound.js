import "../App.css";
import banner from "../img/banner.jpeg";
import Footer from "./Footer";

function NotFound() {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="top-sales">
              <h2 className="text-center">Страница не найдена</h2>
              <p className="notFoundText">Извините, такая страница не найдена!</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
