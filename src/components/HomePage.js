import { useEffect, useState } from "react";
import { fetchBestsellers, fetchItems, fetchMoreItems, fetchNameCategories } from "../api";
import "../App.css";
import Banner from "./Banner";
import Bestsellers from "./catalog/Bestsellers";
import ButtonLoadMore from "./catalog/ButtonLoadMore";
import Categories from "./catalog/Categories";
import CatalogItems from "./catalog/СatalogItems";
import Footer from "./Footer";

function HomePage() {
  const [bestsellers, seBestsellers] = useState([]);
  const [categories, setCategories] = useState([{ title: "Все" }]);
  const [activeCategoryId, setActiveCategoryId] = useState({ all: "all" });
  const [items, setItems] = useState([]);
  const [isButtonMore, setIsButtonMore] = useState(true);
  const [offset, setOffset] = useState(6);

  useEffect(() => {
    let isCancelled = false;
    
    if (!isCancelled) {
      getBestsellers();
      getCategories();
      getAllItems();
    } 

    return () => {
      isCancelled = true;
    };
  }, []);

  const getBestsellers = () => {
    fetchBestsellers()
      .then((res) => seBestsellers(res))
      .catch((e) => {
        console.error(e.message);
      });
  };

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
        setActiveCategoryId(el.category);
        setIsButtonMore(true);
        setOffset(6);
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
            
            {bestsellers?.length && <Bestsellers data={bestsellers} />}

            <section className="catalog">
              <h2 className="text-center">Каталог</h2>
              <Categories
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

export default HomePage;
