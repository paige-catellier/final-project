import { APIkey } from "./constants";

const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const getNews = (keyword) => {
  const to = new Date();
  const from = new Date();

  from.setDate(to.getDate() - 7);

  const fromDate = from.toISOString().split("T")[0];
  const toDate = to.toISOString().split("T")[0];

  return fetch(
    `${newsApiBaseUrl}?q=${keyword}&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${APIkey}`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};
