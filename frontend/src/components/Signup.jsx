import { useState } from "react"
import { BASE_URL } from "../config.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import tagImage from "../assets/tag.png"

export const Signup = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const setUserLogin = useSetRecoilState(userState)
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage] = useState("");


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
        top : '25%',
        left : "49%"
 
      }}>
        signup
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
    < Button 
        variant="contained" 
        onClick={ async()=>{
          try{
            const response = await axios.post(`${BASE_URL}/user/signup` , {
                username : email,
                password : password
            })
            let data = response.data;
            localStorage.setItem("token",data.token)
            setUserLogin({
                isUser : true
            })
            navigate("/notes")
            }catch(err){
              console.error('Error : ', err)
              setErrorMessage("User already exists with this username")
            }

        }}>Signup</Button>
    </div>
    <div style={{
      display : "flex",
      justifyContent : "center",
      color : "red",
      marginTop : 33
    }}>
      {errorMessage}
    </div>
    </div>
}