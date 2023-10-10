import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import {  useSetRecoilState } from "recoil"
import { userState } from "../store/atoms/user"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  Typography } from "@mui/material"
import tagImage from "../assets/tag.png"
import Box from '@mui/material/Box';



export const Signin = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage] = useState("");
    const setUserLogin = useSetRecoilState(userState)



    return<div>
      <div style={{
        marginLeft : 400,
        marginTop : 70,
        position : "relative",
        textAlign : "center"
      }} >
        <div style={{
          
        }}>
          <img src={tagImage}
              style={{
                rotate : "290deg",
                maxHeight : 80
              }}
          ></img>
        </div>
         
      <div style={{
        position : "absolute",
        fontFamily : "scribble",
        fontWeight : 600,
        rotate : "-30deg",
        color : "white",
        top : '26%',
        left : "50%"
 
      }}>
        login
      </div>
      </div> 
     <div style={{
      
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
  }}>
     <Typography variant={"h2"} fontSize={100} style={{
                    color : "white",
                    fontFamily :  'scribble',
                    
                }}>
                Notesy
      </Typography>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
         <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="" label="Username" variant="outlined" 
      type="text"
      onChange={(e)=> setEmail(e.target.value)}
      />
      <TextField id="" label="Password" variant="outlined"
      type="password"
      onChange={(e)=> setPassword(e.target.value)}
      />
     
    </Box>
    </div>
    <div style={{
      display : "flex",
      justifyContent : "center",
      marginTop : 20
    }}>
    <Button 
        variant="contained" 
        onClick={
            async() => {
                try{
                    const response = await axios.post(`${BASE_URL}/user/login`,
                    {
                        username : email,
                        password : password
                    }                
                    )               
                    let data = response.data;                 
                    localStorage.setItem("token",data.token);
                    setUserLogin({
                        isUser : true
                    })
                    navigate("/notes")
                    
                }
            catch (error) {
                    console.error("Login Error:", error);
                    setErrorMessage("An error occurred while logging in.\n(for testing username: f , pass: f)");
                }
        
            }
        }>Login</Button>
    </div>
    <div style={{
        color : "red",
        display : "flex",
        justifyContent : "center",
        marginTop : 33
    }}>{errorMessage}</div>
    </div>
}

    