import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getIsSubmit } from "../../utils";
import { addSearchText } from "../shopSlice";

function SearchNavBar({ handleSearch }) {
  const [formValue, setFormValue] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addSearchText(formValue));
    setFormValue("");
    handleSearch(false);
    navigate("/catalog");
  };

  return (
    <div className="catalog-search-form form-inline searchNavBar">
      <input
        type="text"
        name="search"
        className="form-control"
        value={formValue}
        onChange={(ev) => setFormValue(ev.target.value)}
        placeholder="Поиск"
        onKeyPress={(ev) => getIsSubmit(ev, handleSubmit)}
      />
    </div>
  );
}

export default SearchNavBar;
