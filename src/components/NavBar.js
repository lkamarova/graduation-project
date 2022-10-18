import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import headerLogo from "../img/header-logo.png";
import { addSearchText } from "./shopSlice";

function NavBar() {
  const [isSearch, setIsSearch] = useState(false);
  const [formValue, setFormValue] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addSearchText(formValue));
    setFormValue("");
    setIsSearch(false);
    navigate("/catalog");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="navbar-brand" href="/">
              <img src={headerLogo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <div className="navbar-nav mr-auto">
                <NavLink
                  to="/"
                  className={(match) =>
                    match.isActive ? "nav-link activeLink" : "nav-link"
                  }
                  end
                >
                  Главная
                </NavLink>
                <NavLink
                  to="/catalog"
                  className={(match) =>
                    match.isActive ? "activeLink" : "nav-link"
                  }
                >
                  Каталог
                </NavLink>
                <NavLink
                  to="/about"
                  className={(match) =>
                    match.isActive ? "activeLink" : "nav-link"
                  }
                >
                  О магазине
                </NavLink>
                <NavLink
                  to="/contacts"
                  className={(match) =>
                    match.isActive ? "activeLink" : "nav-link"
                  }
                >
                  Контакты
                </NavLink>
              </div>
              <div>
                <div className="header-controls-pics">
                  {isSearch && (
                    <div className="catalog-search-form form-inline searchNavBar">
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        value={formValue}
                        onChange={(ev) => setFormValue(ev.target.value)}
                        placeholder="Поиск"
                        onKeyPress={handleSubmit}
                        //onChange={(ev) => handleSubmit(ev.target.value)}
                      />
                    </div>
                  )}
                  {!isSearch && (
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={() => setIsSearch(true)}
                    ></div>
                  )}
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
