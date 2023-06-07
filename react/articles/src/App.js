import React, { useEffect, useState } from "react";
import "./App.css";
import "h8k-components";
import { orderBy } from "lodash";

import Articles from "./components/Articles";

const title = "Sorting Articles";

function App({ articles }) {
  const [orderedArticles, setOrderedArticles] = useState([]);

  useEffect(() => {
    articles.sort((a, b) => (a.upvotes <= b.upvotes ? 1 : -1));
    setOrderedArticles(articles);
  }, []);

  const sortUpvotedHandler = () => {
    setOrderedArticles((prevValue) => {
      return [...orderBy(prevValue, "upvotes", "desc")];
    });
  };

  const sortDateHandler = () => {
    setOrderedArticles((prevValue) => {
      return [...orderBy(prevValue, "date", "desc")];
    });
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row align-items-center justify-content-center my-20 navigation">
        <label className="form-hint mb-0 text-uppercase font-weight-light">
          Sort By
        </label>
        <button
          data-testid="most-upvoted-link"
          className="small"
          onClick={sortUpvotedHandler}
        >
          Most Upvoted
        </button>
        <button
          data-testid="most-recent-link"
          className="small"
          onClick={sortDateHandler}
        >
          Most Recent
        </button>
      </div>
      {orderedArticles && <Articles articles={orderedArticles} />}
    </div>
  );
}

export default App;
