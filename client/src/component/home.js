import React from "react";
import {Grid,Paper, Button, TextField} from '@mui/material';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export const Home = () => {
const [data, setData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
});
const navigate = useNavigate()
const handleSubmit = async() => {
    try {
        console.log(data)
        await axios.post('http://localhost:4040/user', data);
        navigate('/buy-now')
    } catch (e) {
        console.log(e);
    }
}
return (
    <Paper style={{ display: "flex", flexDirection: "column",margin: '20px auto', width: 400, alignContent: "center"}}>
        {/* <Grid display='flex' flexDirection='column'> */}
            <TextField
             variant="outlined"
             label="Name"
             style={{margin:'5px'}}
             onChange={(e)=> setData({...data, name: e.target.value})}
             />
            <TextField
             variant="outlined"
             label="Email"
             style={{margin:'5px'}}
             onChange={(e)=> setData({...data, email: e.target.value})}
             />
            <TextField
             variant="outlined"
             label="Contact"
             style={{margin:'5px'}}
             onChange={(e)=> setData({...data, contact: e.target.value})}
             />
            <TextField
             variant="outlined"
             label="Address"
             style={{margin:'5px'}}
             onChange={(e)=> setData({...data, address: e.target.value})}
             />
            <Grid display='flex' flexDirection='row-reverse'>
                <Button
                 variant="contained"
                 disabled = {!(data.name && data.email && data.contact && data.address)}
                 style={{margin:'15px', width: '100px', height: '40px'}}
                 onClick={()=>{
                    handleSubmit();
                 }}
                >
                    Submit
                </Button>
            </Grid>

        {/* </Grid> */}
    </Paper>
)
}