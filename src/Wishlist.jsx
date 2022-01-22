import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "@mui/material/Button";
import "./App.css";

export default function Wishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    const handleWishlist = (event) => {
        if (wishlist === null) {
            wishlist = [];
        }
        if (wishlist.includes(event)) {
            wishlist.splice(wishlist.indexOf(event), 1);
        } else {
            wishlist.push(event);
        }
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        console.log(wishlist);
        window.location.reload();
    };

    const deleteWishlist = () => {
        localStorage.clear();
        window.location.reload();
    };

    function checkID(id) {
        if (id > 3) {
            return 4;
        } else {
            return id;
        }
    }

    function render() {
        console.log(wishlist);
        if (wishlist === null || wishlist[0] === null || wishlist.length === 0) {
            return (
                <p id="emptyList">Die Liste ist leer</p>
            )
        } else {
            return(
                <section className="products">
                    {wishlist.map(renderTrip)}
                </section>
            );
        }
    }

    function renderTrip(t) {
        return (
            <div className="product" key={t.id}>
                <figure>
                    <figcaption>
                        <div>
                            <a href={"/edit?id=" + t.id}><img src={"/images/items/" + checkID(t.id) + ".jpg"} alt="preview"/></a>
                        </div>
                        <p>{t.title}</p>
                        <div>
                        </div>
                        <p>{t.description}</p>
                        <div>
                            <Button id={t.id} type="button" variant="contained" onClick={() => handleWishlist(t)}>
                                Delete from Triplist
                            </Button>
                        </div>
                    </figcaption>
                </figure>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            <h2 className="alignText">Wishlist</h2>
            {render()}
            <div className="flex">
                <div className="wrap">
                    <Button type="button" variant="contained" color="secondary" onClick={() => deleteWishlist()}>
                        Delete Triplist
                    </Button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
