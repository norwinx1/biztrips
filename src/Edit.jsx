import React, {useEffect} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Footer from "./Footer";
import Header from "./Header";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import "./App.css";
import Spinner from "./Spinner";

export default function Edit() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [initialLoad, setInitialLoad] = React.useState(true);
    const [titleValid, setTitleValid] = React.useState(true);
    const [descValid, setDescValid] = React.useState(true);

    useEffect(getTrip, [])

    function getTrip() {
        const requestOptions = {
            method: 'GET'
        }
        fetch('http://localhost:3001/trips/' + window.location.search.split("=")[1], requestOptions)
            .then(res => res.json())
            .then(response => {
            setTitle(response.title);
            setDesc(response.description);
            setInitialLoad(false);
        })
    }

    function handleEdit() {
        if (validateTitle() || validateDesc()) {
            return;
        }
        setInitialLoad(true);
        let id = window.location.search.split("=")[1];
        let startDateArray = [startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), startDate.getHours(), startDate.getMinutes()]
        let endDateArray = [endDate.getFullYear(), endDate.getMonth()+1, endDate.getDate(), endDate.getHours(), endDate.getMinutes()]
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, description: desc, startTrip: startDateArray, endTrip: endDateArray})
        }
        fetch('http://localhost:3001/trips/' + id, requestOptions).then(response => {
            window.open("/", "_self");
        })
    }

    function handleDelete() {
        setInitialLoad(true);
        let id = window.location.search.split("=")[1];
        const requestOptions = {
            method: 'DELETE'
        }
        fetch('http://localhost:3001/trips/' + id, requestOptions).then(response => {
            window.open("/", "_self");
        })
    }

    function validateTitle() {
        if (title === "") {
            setTitleValid(false);
            return true;
        } else {
            setTitleValid(true);
        }
        return false;
    }

    function validateDesc() {
        if (desc === "") {
            setDescValid(false);
            return true;
        } else {
            setDescValid(true);
        }
        return false;
    }

    if (initialLoad) return <Spinner/>
    return (
        <div>
            <Header/>
            <div className="flex">
                <h2>Edit</h2>
                <div className="wrap">
                    <TextField id="outlined-basic" label="Title" variant="outlined" value={title} error={!titleValid}
                               onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div className="wrap">
                    <TextField id="outlined-basic" label="Description" variant="outlined" value={desc} error={!descValid}
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
                    <Button type="button" variant="contained" color="error" id="create"
                            onClick={() => handleDelete()}>Delete</Button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}