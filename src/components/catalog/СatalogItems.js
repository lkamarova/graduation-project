import "../../App.css";
import { v4 } from "uuid";
import Card from "./Card";

function СatalogItems({ data }) {
  return (
    <div className="row">
      {data?.map((el) => (
        <Card key={v4()} item={el} />
      ))}
    </div>
  );
}

export default СatalogItems;
