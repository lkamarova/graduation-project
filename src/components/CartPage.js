import "../App.css";
import Banner from "./Banner";
import Cart from "./catalog/Cart";
import OrderForm from "./catalog/OrderForm";
import Footer from "./Footer";

function CartPage() {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Cart />
            <OrderForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CartPage;
