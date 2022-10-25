import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { getProduct } from "../api";
import "../App.css";
import Preloader from "./Preloader";
import { putItemToCart } from "./shopSlice";

function Product() {
  const { productId } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState(null);
  const [numberOfShoes, setNumberOfShoes] = useState(1);

  const productIdNum = Number(productId);

  useEffect(() => {
    loadProduct();
  }, []);

  const preparedProductSizes = product?.sizes?.filter(
    (el) => el.avalible === true
  );

  const loadProduct = async () => {
    setLoading(true);
    const res = await getProduct(productIdNum);
    setProduct(res);
    setLoading(false);
  };

  const handleToCart = () => {
    const data = {
      ...product,
      selectedSize: size,
      amount: numberOfShoes,
    };

    dispatch(putItemToCart(data));
    navigate("/cart");
  }

  return (
    <section className="catalog-item">
      {loading && <Preloader />}
      {!loading && product && (
        <>
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={product.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{product.sku || ""}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{product.manufacturer || ""}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{product.color || ""}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{product.material || ""}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{product.season || ""}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{product.manufacturer || ""}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:{" "}
                  {preparedProductSizes?.map((el) =>
                    el.avalible === true ? (
                      <span
                        key={v4()}
                        onClick={() => setSize(el.size)}
                        className={
                          el.size === size
                            ? "catalog-item-size selected"
                            : "catalog-item-size"
                        }
                      >
                        {el.size}
                      </span>
                    ) : null
                  )}
                </p>
                {preparedProductSizes && <p>
                  Количество:{" "}
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        setNumberOfShoes((prev) => (prev > 1 ? prev - 1 : prev))
                      }
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">
                      {numberOfShoes}
                    </span>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        setNumberOfShoes((prev) =>
                          prev < 10 ? prev + 1 : prev
                        )
                      }
                    >
                      +
                    </button>
                  </span>
                </p>}
              </div>
              {preparedProductSizes && <button
                disabled={size === null}
                className="btn btn-danger btn-block btn-lg"
                onClick={() =>handleToCart()}
              >
                В корзину
              </button>}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Product;
