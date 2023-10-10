import { useState ,useEffect} from 'react'
import axios from 'axios';
import { BASE_URL } from './config.js';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import {Signin} from "./components/Signin.jsx";
import {Signup} from "./components/Signup.jsx";
import {Landing} from "./components/Landing.jsx";
import {Notes} from "./components/Notes.jsx";
import { RecoilRoot , useSetRecoilState} from 'recoil';
import { userState } from './store/atoms/user.js';
import { Appbar } from './components/Appbar.jsx';
import PrimarySearchAppBar from './components/PrimarySearchAppBar.jsx';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette : {
      mode : 'dark',
      primary : {
        main : orange[500]
      }
    }
  }) 
 
  return (
    <div style={{width: "100vw",
    height : "1000vh",
    backgroundColor : "#111111",
    margin: 0,
    padding: 0, 
    // box-sizing: border-box, 
   
}}>
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <Router>
        {/* <Appbar/> */}
        <PrimarySearchAppBar/>
        <InitUser/>
        <Routes>
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/"} element ={<Landing />} />
          <Route path={"/notes"} element = {<Notes/>}/>
        </Routes>
      </Router>
    </RecoilRoot>
  </ThemeProvider>
    </div>
  )
}

function InitUser(){
  const setUserLogin = useSetRecoilState(userState);

  useEffect(() => {
  const init = async() => {
    const token = localStorage.getItem("token")
            const headers = {
                'authorization' : `Bearer ${token}`
            }
            try{
                const response = await axios.get(`${BASE_URL}/user/me`, {
                    headers : headers
                })
                if(response.status == 200){
                    setUserLogin({
                      isLoading : false,
                      isUser: true
                    })
                }else{
                  setUserLogin({
                    isLoading : false,
                    isUser: false
                })
                }
            }catch(error){
                console.error("Authentication check failed:",error);
                localStorage.removeItem("token");
                setUserLogin({ 
                  isLoading : false,
                  isUser: false 
                });
            }
  }    
     init();
    }, [setUserLogin]);

    return <></>
}

export default App
