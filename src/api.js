export const fetchBestsellers = () =>
  fetch("http://localhost:7070/api/top-sales", { method: "GET" }).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Data coud not be fetched!");
      } else {
        return response.json();
      }
    }
  );

export const fetchNameCategories = () =>
  fetch("http://localhost:7070/api/categories", { method: "GET" }).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Data coud not be fetched!");
      } else {
        return response.json();
      }
    }
  );

export const fetchItems = (categoryId) => {
  const fetchLink = categoryId
    ? `http://localhost:7070/api/items?categoryId=${categoryId}`
    : "http://localhost:7070/api/items";

  return fetch(fetchLink, { method: "GET" }).then((response) => {
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  });
};

export const fetchMoreItems = (offset, categoryId) => {
  const fetchLink = categoryId
    ? `http://localhost:7070/api/items?categoryId=${categoryId}&offset=${offset}`
    : `http://localhost:7070/api/items?offset=${offset}`;

  return fetch(fetchLink, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  });
};

export const searchItems = (text) =>
  fetch(`http://localhost:7070/api/items?q=${text}`, { method: "GET" }).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Data coud not be fetched!");
      } else {
        return response.json();
      }
    }
  );
