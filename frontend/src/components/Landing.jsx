import axios from "axios";
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLogin } from "../store/selectors/isUserLogin";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { Button,CircularProgress} from "@mui/material"


export const Landing = () => {
    const navigate = useNavigate();
    const userLogin= useRecoilValue(isUserLogin);
    const setUserLogin = useSetRecoilState(userState)
    const userLoading = useRecoilValue(isUserLoading)

    if(userLoading === true){
        return  <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
                    <CircularProgress /> {/* Display a loading spinner */}
                </div>
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUserLogin({
            isUser:false
        })
        navigate("/")
    }
   

    if(userLogin){
        navigate("/notes")
    }else{
        navigate('signin')
    }

}