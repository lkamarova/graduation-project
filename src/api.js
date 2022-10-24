const baseUrl = 'http://localhost:7070/api/';

const get = (endpoint) =>
  fetch(`${baseUrl}${endpoint}`, { method: "GET" }).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Data coud not be fetched!");
      } else {
        return response.json();
      }
    }
  );

const post = (endpoint, body) => {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${baseUrl}${endpoint}`, options).then((response) => {
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response;
    }
  });
};

export const fetchBestsellers = () => get("top-sales");

export const fetchNameCategories = () => get("categories");

export const fetchItems = (categoryId) => {
  const fetchLink = categoryId
    ? `items?categoryId=${categoryId}`
    : "items";

  return get(fetchLink);
};

export const fetchMoreItems = (offset, categoryId) => {
  const fetchLink = categoryId
    ? `items?categoryId=${categoryId}&offset=${offset}`
    : `items?offset=${offset}`;

  return get(fetchLink);
};

export const searchItems = (text) => get(`items?q=${text}`);

export const getProduct = (productId) => get(`items/${productId}`);

export const putOrder = (order) => post("order", order);
