import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { getIsSubmit } from "../../utils";
import { clearSearchText } from "../shopSlice";

function SearchForm({ handleSubmit }) {
  const initialSearchText = useSelector((state) => state.shop.searchText);
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!initialSearchText) {
      dispatch(clearSearchText());
      setValue(initialSearchText);
    }
  }, [initialSearchText]);

  return (
    <div className="catalog-search-form form-inline">
      <input
        type="text"
        name="search"
        className="form-control"
        placeholder="Поиск"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        onKeyPress={(ev) => getIsSubmit(ev, handleSubmit)}
      />
    </div>
  );
}

export default SearchForm;
