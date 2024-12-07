import React, { useState, createContext,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { PageHeader } from "../../ui/PageHeader";
import { authPost, validCustomerId } from './authCall';
import { useAuthContext } from "../../contexts/authContext";

const Login=()=>{
    const navigate = useNavigate();
    const { setAuthData } = useAuthContext();
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}

    const [customerId, setCustomerId] = useState("");
    const [errorCustomerId, setErrorCustomerId] = useState("");

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");

    const handleCustomerId = (value) =>{
        let numberRegex = /^\d+$/;
        if(value !== "" && numberRegex.test(value)){
            setCustomerId(value);
            setErrorCustomerId(false);
        }
        else if(value === ""){
            setErrorCustomerId(true);
        }
        else if(!numberRegex.test(value)){
            setErrorCustomerId(true);
            setCustomerId(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(customerId !== "" && password !==""){
            const response = authPost(customerId, password);
            response.then((data)=>{
                
                const customerIds = validCustomerId();
                customerIds.then((res) =>{
                    const validation = res.filter((results) => results.customerId === Number(data.customerId));
                    if(validation.length >= 1){
                        setAuthData(data);
                        navigate("/accounts");
                        setSeverity("success");
                    }else{
                        setOpen(true);
                        setSeverity("error");
                    }
                })
            })
        }
        else{
            setOpen(true);
            setSeverity("error");
        }
    };

    const handlePassword = (value) =>{
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(value !== "" && !passwordRegex.test(value)){
            setPassword(value);
            setErrorPassword(false);
        }
        else if(value === ""){
            setErrorPassword(true);
        }
        else if(passwordRegex.test(value)){
            setErrorPassword(true);
            setPassword(value)
        }
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    return(
        <>
        <PageHeader />
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <TextField 
                    label='Cutomer Id' 
                    value={customerId}
                    placeholder='Cutomer Id' 
                    variant="outlined" 
                    fullWidth 
                    margin="normal"
                    helperText={errorCustomerId ? "Customer Id is not valid" : ""} 
                    required
                    onChange={(e) => handleCustomerId(e.target.value)}
                    error={errorCustomerId}
                />
                <TextField 
                    label='Password' 
                    value={password}
                    placeholder='Enter password' 
                    type='password' 
                    variant="outlined" 
                    margin="normal" 
                    helperText={errorPassword ? "Password is not valid" : ""}
                    fullWidth 
                    required
                    onChange={(e) => handlePassword(e.target.value)}
                    error={errorPassword}
                />
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSubmit}>Sign in</Button>
            </Paper>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
         Invalid Customer Id and Password.
        </Alert>
      </Snackbar></>
    )
}

export default Login