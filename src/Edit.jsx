import React from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function Edit() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');

    function handleEdit() {
        console.log(title, desc);
        let id = window.location.search.split("=")[1];
        console.log(id);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, title: title, description: desc})
        }
        fetch('http://localhost:3001/trips', requestOptions).then(response => console.log(response))
    }

    return (
        <div className="flex">
            <h2>Edit</h2>
            <div>
                <TextField id="outlined-basic" label="Title" variant="outlined"
                           onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Description" variant="outlined"
                           onChange={(event) => setDesc(event.target.value)}/>
            </div>
            <div>
                <Button type="button" variant="contained" id="create" onClick={() => handleEdit()}>Edit</Button>
            </div>
        </div>
    );
}