import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <img
                                width="150px"
                                alt="Carved Rock Fitness"
                                src="/images/logo.png"
                            />
                        </li>
                        <li>
                            <Link to="/wishlist"> <img
                                width="40px"
                                height="40px"
                                alt="Carved Rock Fitness"
                                src="/images/wishlist.png"
                            /></Link>
                        </li>
                    </ul>
                </nav>
            </header>
    );
}
