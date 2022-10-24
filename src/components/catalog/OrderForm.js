import { useState } from "react";
import "../../App.css";
import { putOrder } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setLoading } from "../shopSlice";
import PreloaderAllPage from "../PreloaderAllPage";

function OrderForm({ item }) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = useSelector((state) => state.shop.cart);
  const dispatch = useDispatch();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const preparedArr = items.map((el) => {
      return { id: el.id, price: el.price, count: el.amount };
    });

    const order = {
      owner: {
        phone,
        address,
      },
      items: preparedArr,
    };

    dispatch(setLoading(true));

    return putOrder(order)
      .then((res) => {
        setPhone("");
        setAddress("");
        setIsSubmit(true);
        setIsAgree(false);
        dispatch(clearCart());
        dispatch(setLoading(false));
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(()=>setIsSubmitting(false));
  };

  

  return (
    <>
      {isSubmitting && <PreloaderAllPage />}
      {!isSubmitting && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card cardStyle">
            <form className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  onChange={(ev) => setPhone(ev.target.value)}
                  value={phone}
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  onChange={(ev) => setAddress(ev.target.value)}
                  value={address}
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                />
              </div>
              <div className="form-group form-check">
                <input
                  onChange={() => setIsAgree((prev) => !prev)}
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>

                {isSubmit && (
                  <>
                    <br />
                    <span className="formSuccess">
                      <i className="material-icons">done</i>Заказ успешно
                      отправлен
                    </span>
                  </>
                )}
              </div>

              <button
                disabled={!isAgree || !phone || !address}
                type="submit"
                className="btn btn-outline-secondary"
                onClick={handleSubmit}
              >
                Оформить
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default OrderForm;
