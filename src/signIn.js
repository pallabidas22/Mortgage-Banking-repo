import React, { useState } from 'react'
import { Paper, Avatar, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { debounce } from 'lodash';

const Login=()=>{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}

    const [customerId, setCustomerId] = useState("");
    const [errorCustomerId, setErrorCustomerId] = useState("");

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const debouncedSearch = debounce((inputvaue) => {
        setCustomerId(value)
    }, 500);

    const handleCustomerId = (value) =>{
        let numberRegex = /^\d+$/;
        console.log("1111", numberRegex.test(value))
        if(value !== "" && numberRegex.test(value)){
            debouncedSearch(value);
        }
        else if(value === ""){
            setErrorCustomerId(true);
            return;
        }
        else if(!numberRegex.test(value)){
            setErrorCustomerId(true);
            return;
        }
    }

    const handlePassword = (value) =>{
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        console.log("1111", passwordRegex.test(value))
        if(value !== "" && passwordRegex.test(value)){
            debouncedSearch(value);
        }
        else if(value === ""){
            setErrorPassword(true);
            return;
        }
        else if(!passwordRegex.test(value)){
            setErrorPassword(true);
            return;
        }
    }
    return(
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
                    required
                    onChange={handleCustomerId(e.target.value)}
                    error={errorCustomerId}
                />
                <TextField 
                    label='Password' 
                    placeholder='Enter password' 
                    type='password' 
                    variant="outlined" 
                    margin="normal" 
                    fullWidth 
                    required
                    onChange={handlePassword(e.target.value)}
                    error={errorPassword}
                />
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </Paper>
        </Grid>
    )
}

export default Login