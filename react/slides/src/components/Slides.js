import React, { useState, useEffect } from "react";

function Slides({ slides }) {
  const [currentSlice, setCurrentSlice] = useState();
  const [currentIndexSlice, setCurrentIndexSlice] = useState(0);

  useEffect(() => {
    setCurrentSlice(slides[currentIndexSlice]);
  }, []);

  useEffect(() => {
    setCurrentSlice(slides[currentIndexSlice]);
  }, [currentIndexSlice, currentSlice, slides]);

  const prevHandler = (e) => {
    e.preventDefault();
    if (currentIndexSlice - 1 >= 0) {
      setCurrentIndexSlice(currentIndexSlice - 1);
      setCurrentSlice(slides[currentIndexSlice - 1]);
    }
  };

  const nextHandler = (e) => {
    e.preventDefault();
    if (currentIndexSlice + 1 < slides.length) {
      setCurrentIndexSlice(currentIndexSlice + 1);
      setCurrentSlice(slides[currentIndexSlice + 1]);
    }
  };

  const restartHandler = (e) => {
    e.preventDefault();
    setCurrentIndexSlice(0);
    setCurrentSlice(slides[0]);
  };

  return (
    <div>
      <div id="navigation" className="text-center">
        <button
          data-testid="button-restart"
          className="small outlined"
          disabled={currentIndexSlice === 0}
          onClick={restartHandler}
        >
          Restart
        </button>
        <button
          data-testid="button-prev"
          className="small"
          disabled={currentIndexSlice === 0}
          onClick={prevHandler}
        >
          Prev
        </button>
        <button
          data-testid="button-next"
          className="small"
          disabled={currentIndexSlice === slides.length - 1}
          onClick={nextHandler}
        >
          Next
        </button>
      </div>
      {currentSlice && (
        <div id="slide" className="card text-center">
          <h1 data-testid="title">{currentSlice.title}</h1>
          <p data-testid="text">{currentSlice.text}</p>
        </div>
      )}
    </div>
  );
}

export default Slides;
