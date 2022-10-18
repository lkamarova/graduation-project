import "../../App.css";

function ButtonLoadMore({ handleLoad }) {
  return (
    <div className="text-center">
      <button
        className="btn btn-outline-primary"
        onClick={() => handleLoad()}
      >
        Загрузить ещё
      </button>
    </div>
  );
}

export default ButtonLoadMore;
