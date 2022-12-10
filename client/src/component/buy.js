import React from "react";
import {Grid,Paper, Button} from '@mui/material';
import axios from 'axios';
import bookImage from '../alchemist.jpeg';
import { useNavigate } from 'react-router-dom';
export const Buy = () => {
const bookData = {
    name: 'The Alchemist',
    description: 'Novel by Paulo Coelho',
    amount: 149,
    url: bookImage
}
const navigate = useNavigate();
const initPayment = (data) => {
    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Abc book store",
        description: "Test Transaction",
        image: bookData.url,
        order_id: data.id,
        handler: async (response) => {
            try {
                const { data } = await axios.post('http://localhost:4040/verify', response);
                if(data){
                    navigate(`/payment/${response.razorpay_payment_id}`)
                }
            } catch (error) {
                console.log(error);
            }
        },
        prefill: {
            email: "sum@gmail.com",
            contact: "9999999999"
        },
        theme: {
            color: "#3399cc",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};
const handleSubmit = async() => {
    try {
        axios.post('http://localhost:4040/orders',{amount: bookData.amount}).then(({data})=>initPayment(data.order))
       
    } catch (e) {
        console.log(e);
    }
}
return (
    <Paper style={{ display: "flex", flexDirection: "column",margin: '50px auto', width: 400}}>
        <Grid style={{ display: "flex", flexDirection: "row",margin:'0', alignContent: "center", justifyContent:'center'}}>
            <img src={bookData.url} style={{width:'60px', height:'100px', margin:'10px',}}/>
            <Grid display='flex' flexDirection='column'style={{margin:'10px'}}>
                <h3 style={{margin:'0', textAlign: 'left'}}>{bookData.name}</h3>
                <p style={{margin:'0', color:'grey', fontSize: 12, textAlign: 'left'}}>By : <i>{bookData.description}</i></p>
                <h5 style={{margin:'20px 0', textAlign: 'left'}}>Amount: {bookData.amount} INR</h5>
            </Grid>
            <Grid
             style={{ display: "flex", flexDirection:'column-reverse'}}
            >
            <Button
             variant="contained"
             style={{marginBottom:'10px'}}
             onClick={()=>{
                handleSubmit();
             }}
            >
                Buy Now
            </Button>
            </Grid>
        </Grid>
    </Paper>
)
}