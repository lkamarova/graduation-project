import { useState } from "react";
import "../../App.css";
import { putOrder } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setLoading } from "../shopSlice";
import PreloaderAllPage from "../PreloaderAllPage";
import { DEFAULT_FORM_VALUE } from "./constants";

function OrderForm({ item }) {
  const [formValue, setFormValue] = useState(DEFAULT_FORM_VALUE);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disabledSubmit =
    !formValue.checkbox || !formValue.phone || !formValue.address;

  const items = useSelector((state) => state.shop.cart);
  const dispatch = useDispatch();

  const handleChange = (target) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const preparedArr = items.map((el) => {
      return { id: el.id, price: el.price, count: el.amount };
    });

    const order = {
      owner: {
        phone: formValue.phone,
        address: formValue.address,
      },
      items: preparedArr,
    };

    dispatch(setLoading(true));

    return putOrder(order)
      .then((res) => {
        setFormValue(DEFAULT_FORM_VALUE);
        setIsSubmit(true);
        dispatch(clearCart());
        dispatch(setLoading(false));
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => setIsSubmitting(false));
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
                  onChange={(ev) => handleChange(ev.target)}
                  value={formValue.phone}
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Ваш телефон"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  onChange={(ev) => handleChange(ev.target)}
                  value={formValue.address}
                  className="form-control"
                  name="address"
                  id="address"
                  placeholder="Адрес доставки"
                />
              </div>
              <div className="form-group form-check">
                <input
                  value={formValue.checkbox}
                  onChange={(ev) => handleChange(ev.target)}
                  type="checkbox"
                  className="form-check-input"
                  id="checkbox"
                  name="checkbox"
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
                disabled={disabledSubmit}
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
