import React from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function Create() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');

    function handleCreate() {
        console.log(title, desc);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, description: desc})
        }
        fetch('http://localhost:3001/trips', requestOptions).then(response => console.log(response))
    }

    return (
        <div className="flex">
            <h2>Create</h2>
            <div>
                <TextField id="outlined-basic" label="Title" variant="outlined"
                           onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Description" variant="outlined"
                           onChange={(event) => setDesc(event.target.value)}/>
            </div>
            <div>
                <Button type="button" variant="contained" id="create" onClick={() => handleCreate()}>Create</Button>
            </div>
        </div>
    );
}