import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wishlist from "./Wishlist";

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                </Route>
                <Route path="wishlist" element={<Wishlist/>}/>
            </Routes>
        </BrowserRouter>,
    </ErrorBoundary>,
    document.getElementById("root")
);
