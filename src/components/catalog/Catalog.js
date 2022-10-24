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
import Preloader from "../Preloader";
import { addSearchText, clearSearchText, setLoading } from "../shopSlice";
import ButtonLoadMore from "./ButtonLoadMore";
import Categories from "./Categories";
import SearchForm from "./SearchForm";
import CatalogItems from "./СatalogItems";

function Catalog({ isSearch }) {
  const [categories, setCategories] = useState([{ title: "Все" }]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isLoadedСategories, setIsLoadedСategories] = useState(false);

  const [items, setItems] = useState([]);
  const [isLoadedItems, setIsLoadedItems] = useState(false);

  const [isButtonMore, setIsButtonMore] = useState(true);

  const [offset, setOffset] = useState(6);

  const initialSearchText = useSelector((state) => state.shop.searchText);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
    getAllItems();

    if (initialSearchText) {
      handleSearch(initialSearchText);
    }

    return () => {
      dispatch(clearSearchText());
    };
  }, []);

  const getCategories = () => {
    fetchNameCategories()
      .then((res) => {
        setCategories(res);
        setIsLoadedСategories(true);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const getAllItems = () => {
    fetchItems()
      .then((res) => {
        setItems(res);
        setIsLoadedItems(true);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const loadMoreItems = () => {
    fetchMoreItems(offset, activeCategoryId)
      .then((res) => {
        setItems((prev) => [...prev, ...res]);
        setOffset((prev) => prev + 6);
        if (res.length < 6) {
          setIsButtonMore(false);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleChangeCategory = (el) => {
    dispatch(setLoading(true));
    fetchItems(el?.id)
      .then((res) => {
        setItems(res);
        setActiveCategoryId(el?.id);
        setIsButtonMore(true);
        setOffset(6);
        dispatch(clearSearchText());
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const handleSearch = (text) => {
    searchItems(text)
      .then((res) => {
        setItems(res);
        setActiveCategoryId(res[0].category);
        dispatch(addSearchText(text));
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <section className="catalog">
      {(!isLoadedСategories || !isLoadedItems) && <Preloader />}
      {isLoadedСategories && isLoadedItems && (
        <>
          <h2 className="text-center">Каталог</h2>
          {isSearch && <SearchForm handleSubmit={handleSearch} />}
          <Categories
            activeCategory={activeCategoryId}
            data={categories}
            handleClick={handleChangeCategory}
          />
          {isLoadedItems && <CatalogItems data={items} />}
          {isButtonMore && items?.length >= 6 && (
            <ButtonLoadMore handleLoad={loadMoreItems} />
          )}
        </>
      )}
    </section>
  );
}

export default Catalog;
