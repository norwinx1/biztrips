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
    const handleFilter = (event) => {
        setMonth(event.target.value);
    };

    const {data: trips, loading: loadingTrips, error: errorTrips} = useFetch(
        "trips"
    );
    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

    function renderTrip(t) {
        return (
            <div className="product" key={t.id}>
                <figure>
                    <div>
                        <img src={"images/items/" + t.id + ".jpg"} alt="name "/>
                    </div>
                    <figcaption>
                        <a href="#. . . ">{t.title}</a>
                        <div>
              <span>
                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
              </span>
                        </div>
                        <p>{t.description}</p>
                        <div>
                            <Button type="button" variant="contained">
                                Add to Triplist
                            </Button>
                        </div>
                    </figcaption>

                </figure>

            </div>
        );
    }

    // if month selected then filter the trips from month === month
    const filteredTrips = month ? trips.filter((t) => t.startTrip[1] === parseInt(month)) : trips;

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
                                    <MenuItem value={months[0]}>Januar</MenuItem>
                                    <MenuItem value={months[1]}>Februar</MenuItem>
                                    <MenuItem value={months[2]}>März</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </section>
                    {month && (
                        <h2>
                            Found {filteredTrips.length}
                            {filteredTrips.length > 1 ? " trips" : " trip"} for the month of
                            {" " + month}
                        </h2>
                    )}
                    <section id="products">{filteredTrips.map(renderTrip)}</section>

                </main>

            </div>
            <Footer/>
        </>
    );
}
