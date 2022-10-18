/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../App.css";
import { v4 } from "uuid";
import Card from "./Card";

function Bestsellers({ data }) {
  return (
    <>
      <h2 className="text-center">Хиты продаж</h2>
      <div className="row">
        {data?.map((el) => (
          <Card key={v4()} item={el} />
        ))}
      </div>
    </>
  );
}

export default Bestsellers;
