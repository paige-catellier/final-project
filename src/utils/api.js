import { APIkey } from "./constants";

export const getNews = () => {
  return fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIkey}`
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};
