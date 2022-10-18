/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import "../../App.css";

function Card({ item }) {
  return (
    <div className="col-4">
            <div className="card catalog-item-card">
              <img
                src={item.images[0]}
                className="card-img-top img-fluid"
                alt="Босоножки 'MYER'"
              />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price}</p>
                <Link to="/products/1.html" className="btn btn-outline-primary">
                  Заказать
                </Link>
              </div>
            </div>
          </div>
  );
}

export default Card;
