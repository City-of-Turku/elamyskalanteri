import React from "react";
import ReactDOM from "react-dom";
import IsolatedApp from "./IsolatedApp";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const elements = document.querySelectorAll(".event-calendar-embed");

// Loop through all the embed elements and initialise the app for each of them
elements.forEach((currentElement) => {
  if (!(currentElement instanceof HTMLElement)) return;

  const data: Record<string, string> = JSON.parse(JSON.stringify(currentElement.dataset));

  // const data: Record<string, string> = Object.fromEntries(
  //   Object.keys(currentElement.dataset)
  //     .filter(key => {
  //       console.log('key', key);
  //       return currentElement.dataset[key] !== undefined
  //     })
  //     .map((key) => {
  //       console.log('currentElement.dataset[key]', currentElement.dataset[key]);
  //       return [[key], currentElement.dataset[key]]
  //     })
  // );

  ReactDOM.render(
    <React.StrictMode>
      <IsolatedApp data={data} />
    </React.StrictMode>,
    currentElement
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
