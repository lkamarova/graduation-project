/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNameCategories,
  fetchMoreItems,
  fetchItems,
  searchItems,
} from "../../api";
import "../../App.css";
import Banner from "../Banner";
import Footer from "../Footer";
import { clearSearchText } from "../shopSlice";
import ButtonLoadMore from "./ButtonLoadMore";
import Categories from "./Categories";
import SearchForm from "./SearchForm";
import CatalogItems from "./СatalogItems";

function CatalogPage() {
  const [categories, setCategories] = useState([{ title: "Все" }]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [items, setItems] = useState([]);
  const [isButtonMore, setIsButtonMore] = useState(true);
  const [offset, setOffset] = useState(6);
  const [dataFormSearch, setDataFormSearch] = useState();

  const initialSearchText = useSelector(state => state.shop.searchText);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      getCategories();
      getAllItems();
      
      if(initialSearchText) {
        setDataFormSearch(initialSearchText);
        handleSearch(initialSearchText);
      }
    }

    return () => {
      isCancelled = true;
      dispatch(clearSearchText());
    };
  }, []);

  const getCategories = () => {
    fetchNameCategories()
      .then((res) => setCategories(res))
      .catch((e) => {
        console.error(e.message);
      });
  };

  const getAllItems = () => {
    fetchItems()
      .then((res) => setItems(res))
      .catch((e) => {
        console.error(e.message);
      });
  };

  const loadMoreItems = () => {
    fetchMoreItems(offset, activeCategoryId)
      .then((res) => {
        setItems((prev) => [...prev, ...res]);
        setOffset((prev) => prev + 6);
        if (res?.length === 0 || res?.length < 6) {
          setIsButtonMore(false);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleChangeCategory = (el) => {
    fetchItems(el?.id)
      .then((res) => {
        setItems(res);
        setActiveCategoryId(el?.id);
        setIsButtonMore(true);
        setOffset(6);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleSearch = (text) => {
    searchItems(text)
      .then((res) => {
        setItems(res);
        setActiveCategoryId(res[0].category)
      })
      .catch((e) => {
        console.error(e.message);
      });
  };


  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <SearchForm
                value={dataFormSearch}
                setData={setDataFormSearch}
                handleSubmit={handleSearch}
              />
              <Categories
                activeCategory={activeCategoryId}
                data={categories}
                handleClick={handleChangeCategory}
              />
              <CatalogItems data={items} />
              {isButtonMore && items?.length >= 6 && (
                <ButtonLoadMore handleLoad={loadMoreItems} />
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CatalogPage;
