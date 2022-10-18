/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../App.css";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

function Categories({ activeCategory, data, handleClick }) {
  const getStyle = (categoryId) => (activeCategory == categoryId) ? "nav-link active" : "nav-link"

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item" onClick={() => handleClick()}>
        <Link className={getStyle()} to="#">
          Все
        </Link>
      </li>
      {data?.map((el) => (
        <li key={v4()} className="nav-item" onClick={() => handleClick(el)}>
          <Link to="#" className={getStyle(el.id)}>
            {el.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
