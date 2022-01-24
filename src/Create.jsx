import React from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import Spinner from "./Spinner";

export default function Create() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [initialLoad, setInitialLoad] = React.useState(false);

    function handleCreate() {
        setInitialLoad(true);
        let startDateArray = [startDate.getFullYear(), startDate.getMonth()+1, startDate.getDate(), startDate.getHours(), startDate.getMinutes()]
        let endDateArray = [endDate.getFullYear(), endDate.getMonth()+1, endDate.getDate(), endDate.getHours(), endDate.getMinutes()]
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, description: desc, startTrip: startDateArray, endTrip: endDateArray})
        }
        fetch('http://localhost:3001/trips', requestOptions).then(response => {
            window.open("/", "_self");
        });
    }

    if (initialLoad) return <Spinner/>
    return (
        <div>
            <Header/>
            <div className="flex">
                <h2>Create</h2>
                <div className="wrap">
                    <TextField id="outlined-basic" label="Title" variant="outlined"
                               onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div className="wrap">
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                               onChange={(event) => setDesc(event.target.value)}/>
                </div >
                <div className="wrap">
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Start Date"
                            value={startDate}
                            inputFormat="dd.MM.yyyy HH:mm"
                            ampm={false}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}/>
                    </LocalizationProvider>
                </div>
                <div className="wrap">
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="End Date"
                            value={endDate}
                            inputFormat="dd.MM.yyyy HH:mm"
                            ampm={false}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}/>
                    </LocalizationProvider>
                </div>
                <div className="wrap">
                    <Button type="button" variant="contained" id="create" onClick={() => handleCreate()}>Create</Button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}