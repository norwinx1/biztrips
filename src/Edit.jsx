import React from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Footer from "./Footer";
import Header from "./Header";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import "./App.css";
import useFetch from "./services/useFetch";

export default function Edit() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const {data: trips} = useFetch(
        "trips"
    );

    function handleEdit() {
        console.log(title, desc, startDate, endDate);
        let id = window.location.search.split("=")[1];
        console.log(id);
        let startDateArray = [startDate.getFullYear(), startDate.getMonth(), startDate.getDay(), startDate.getHours(), startDate.getMinutes()]
        let endDateArray = [endDate.getFullYear(), endDate.getMonth(), endDate.getDay(), endDate.getHours(), endDate.getMinutes()]
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, description: desc, startTrip: startDateArray, endTrip: endDateArray})
        }
        fetch('http://localhost:3001/trips/' + id, requestOptions).then(response => {
            console.log(response);
            window.open("/", "_self");
        })
    }

    function handleDelete() {
        let id = window.location.search.split("=")[1];
        const requestOptions = {
            method: 'DELETE'
        }
        fetch('http://localhost:3001/trips/' + id, requestOptions).then(response => {
            console.log(response);
            window.open("/", "_self");
        })
    }

    return (
        <div>
            <Header/>
            <div className="flex">
                <h2>Edit</h2>
                <div className="wrap">
                    <TextField id="outlined-basic" label="Title" variant="outlined"
                               onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div className="wrap">
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                               onChange={(event) => setDesc(event.target.value)}/>
                </div>
                <div className="wrap">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}/>
                    </LocalizationProvider>
                </div>
                <div className="wrap">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}/>
                    </LocalizationProvider>
                </div>
                <div className="wrap">
                    <Button type="button" variant="contained" id="create" onClick={() => handleEdit()}>Edit</Button>
                </div>
                <div className="wrap">
                    <Button type="button" variant="contained" color="error" id="create" onClick={() => handleDelete()}>Delete</Button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}