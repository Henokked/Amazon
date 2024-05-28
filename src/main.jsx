import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import Header from './Components/Header/Header.jsx'
// import CarouselEffect from './Components/Carousel/Carousel.jsx'
// import Category from './Components/category/Category.jsx'
// import Product from './Components/product/Product.jsx'
import { DataProvider } from "./Components/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
