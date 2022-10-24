import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import "../../App.css";
import { deleteItemFromCart, getTotalCost } from "../shopSlice";

function Cart() {
  const items = useSelector((state) => state.shop.cart);
  const dispatch = useDispatch();
  const totalCost = useSelector((state) => state.shop.totalCost);
  
  useEffect(() => {
    dispatch(getTotalCost());
  }, [items])

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((el, index) => (
            <tr key={v4()}>
              <td scope="row">{index+1}</td>
              <td>
                <a href={`/catalog/${el.id}`}>{el.title}</a>
              </td>
              <td>{el.selectedSize}</td>
              <td>{el.amount}</td>
              <td>{el.price}</td>
              <td>{el.price * el.amount}</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => dispatch(deleteItemFromCart(el.id))}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-right" colSpan="5">Общая стоимость</td>
            <td>{totalCost}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Cart;
