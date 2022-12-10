import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
export const Payment = () => {
    const params = useParams();
    const [value, setValue] = useState([]);
    const getData = async () => {
        const {data: paymentData} = await axios.get(`http://localhost:4040/payment/${params.id}`);
        setValue(paymentData)
    }
    useEffect(()=>{
        getData();
    },[])
return (
    <div>

        <p style={{color:'green', marginTop:'50px', fontSize:20}}>Your payment of <b>{value.amount/1000} INR</b> is successfully made by <b>{value.method}</b> payment method.</p>
        
    </div>
)
}