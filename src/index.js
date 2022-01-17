import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wishlist from "./Wishlist";
import Create from "./Create";
import Edit from "./Edit";

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                </Route>
                <Route path="wishlist" element={<Wishlist/>}/>
                <Route path="create" element={<Create/>}/>
                <Route path="edit" element={<Edit/>}/>
            </Routes>
        </BrowserRouter>,
    </ErrorBoundary>,
    document.getElementById("root")
);
