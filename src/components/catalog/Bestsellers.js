/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../App.css";
import { v4 } from "uuid";
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchBestsellers } from "../../api";
import Preloader from "../Preloader";

function Bestsellers() {
  const [bestsellers, seBestsellers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      getBestsellers();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const getBestsellers = () => {
    fetchBestsellers()
      .then((res) => {
        seBestsellers(res);
        setIsLoaded(true);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  if(!bestsellers?.length) {
    return null;
  }
  
  return (
    <>
      <h2 className="text-center">Хиты продаж</h2>
      {!isLoaded && <Preloader />}
      {isLoaded && <div className="row">
        {bestsellers.map((el) => (
          <Card key={v4()} item={el} />
        ))}
      </div>}
    </>
  );
}

export default Bestsellers;
