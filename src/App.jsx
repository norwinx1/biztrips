import React from "react";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Box, FormControl, InputLabel} from "@mui/material";

export default function App() {
    const [month, setMonth] = React.useState('');
    let wishlist = new Set();
    const handleFilter = (event) => {
        setMonth(event.target.value);
        filteredTrips = [];
        for (let i = 0; i < trips.length; i++) {
            if (trips[i].startTrip[1] === event.target.value) {
                filteredTrips.push(trips[i]);
            }
        }
        console.log(filteredTrips);
    };
    const handleWishlist = (event) => {
        if (wishlist.has(event)) {
            wishlist.delete(event);
        } else {
            wishlist.add(event);
        }
        console.log(wishlist);
    };
    const {data: trips, loading: loadingTrips, error: errorTrips} = useFetch(
        "trips"
    );
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    function checkID(id) {
        if (id > 3) {
            return 4;
        } else {
            return id;
        }
    }
    function renderTrip(t) {
        return (
            <div className="product" key={t.id}>
                <figure>
                    <div>
                        <a href={"/edit?id=" + t.id}><img src={"images/items/" + checkID(t.id) + ".jpg"} alt="preview"/></a>
                    </div>
                    <figcaption>
                        <p>{t.title}</p>
                        <div>
                        </div>
                        <p>{t.description}</p>
                        <div>
                            {renderButton(t)}
                        </div>
                    </figcaption>
                </figure>
            </div>
        );
    }

    function renderButton(t) {
        if (!wishlist.has(t)) {
            return <Button type="button" variant="contained" onClick={() => handleWishlist(t)}>
                Add to Triplist
            </Button>
        } else {
            return <Button type="button" variant="contained" onClick={() => handleWishlist(t)}>
                Remove from Triplist
            </Button>
        }
    }

    // if month selected then filter the trips from month === month
    let filteredTrips = month ? trips.filter((t) => t.startTrip[1] === parseInt(month)) : trips;

    // if error then throw the errror
    if (errorTrips) throw errorTrips;
    if (loadingTrips) return <Spinner/>;
    // shorthand for react fragment
    return (
        <>
            <div>
                <Header/>
                <main>
                    <section id="filters">
                        <Box sx={{minWidth: 30}}>
                            <FormControl fullWidth>
                                <InputLabel id="month">Month</InputLabel>
                                <Select
                                    labelId="month"
                                    value={month}
                                    label="Month"
                                    onChange={handleFilter}
                                >
                                    <MenuItem value={1}>Januar</MenuItem>
                                    <MenuItem value={2}>Februar</MenuItem>
                                    <MenuItem value={3}>März</MenuItem>
                                    <MenuItem value={4}>April</MenuItem>
                                    <MenuItem value={5}>Mai</MenuItem>
                                    <MenuItem value={6}>Juni</MenuItem>
                                    <MenuItem value={7}>Juli</MenuItem>
                                    <MenuItem value={8}>August</MenuItem>
                                    <MenuItem value={9}>September</MenuItem>
                                    <MenuItem value={10}>Oktober</MenuItem>
                                    <MenuItem value={11}>November</MenuItem>
                                    <MenuItem value={12}>Dezember</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </section>
                    {month && (
                        <h2>
                            Found {filteredTrips.length}
                            {filteredTrips.length > 1 ? " trips" : " trip"} for the month of
                            {" " + months[month - 1]}
                        </h2>
                    )}
                    <section id="products">{filteredTrips.map(renderTrip)}</section>
                    <Button type="button" variant="contained" id="create"
                            onClick={() => window.open("/create", "_self")}>Create</Button>
                </main>
            </div>
            <Footer/>
        </>
    );
}
