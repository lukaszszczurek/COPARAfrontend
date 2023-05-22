import React from 'react';
import {MDCTextField} from '@material/textfield';
import styled from "styled-components";
import {Button} from "@mui/material";
import User from "../types/CoreTypes";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

function LoginUser(props: any) {

    const [data, setData] = React.useState<any>("");


    //get data from input
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const url = 'http://localhost:8080/api/v1/auth/register';


    // post data to server localhost:8080

    function api<T>(url : string) : Promise <T> {
        return fetch(url).then(response => response.json());
    };


    const handleSubmit = async () => {
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', {email:email, password:password});
        console.log(response.data);
    };

    // Define the login function that will be called when the user submits the form
    const login = async (username:string, password:string) => {
        try {
            api(url+email).then(response => setData(response)).catch(error => console.log(error));
            console.log(data);
            console.log(data.password)


            if(password === data.password){
                toast.success("Login success");
                console.log("Login success")

            }
            else {
                toast.error("Login failed");
                console.log("Login failed")
            }
            // Send the email and password to the server


        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>LoginUser</h1>

            <div className="mdc-text-field mdc-text-field--outlined">
                <StyledInput type="text" id="email" className="mdc-text-field__input" placeholder="Email..."
                onChange={(e) => {setEmail(e.target.value)}}
                />
                <StyledInput type="password" id="password" className="mdc-text-field__input" placeholder="Password..."
                onChange={(e) => {setPassword(e.target.value)}}
                />
                <div className="mdc-notched-outline">
                    <div className="mdc-notched-outline__leading"/>
                    <div className="mdc-notched-outline__notch">

                    </div>
                    <div className="mdc-notched-outline__trailing"/>
                </div>
                </div>

            <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
        </div>



    );
}

export default LoginUser;


const StyledInput = styled.input`
    width: 80%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 5px;
    margin-bottom: 16px;
    resize: vertical;
`;
