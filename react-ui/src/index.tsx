import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const els = document.querySelectorAll(".event-calendar-embed");
for (let i = 0; i < els.length; i++) {
  if (!(els[i] instanceof HTMLElement)) continue;
  const el = els[i] as HTMLElement;
  const data: ({ [key: string]: string }) = Object.fromEntries(
    Object.keys(el.dataset)
    .filter(key => el.dataset[key] !== undefined)
    .map((key) => ([[key], el.dataset[key]]))
  );
  
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App data={data} />
      </Provider>
    </React.StrictMode>,
    el
  );
  
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
