import { Button, Typography ,CircularProgress} from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLogin } from "../store/selectors/isUserLogin";
import { userState } from "../store/atoms/user";
import { isUserLoading } from "../store/selectors/isUserLoading";


export const Appbar = () => {

    const navigate = useNavigate();
    const userLogin = useRecoilValue(isUserLogin)
    const setUserLogin = useSetRecoilState(userState)
    const userLoading = useRecoilValue(isUserLoading)


    if(userLoading){
        return <div style={{
                    display : "flex",
                    justifyContent : "space-between",
                    padding : 5
                    }}>
                    <div>
                        <Typography fontSize={25}
                        onClick = {() => {
                            if(userLogin){
                                window.location.reload();}else{
                                    navigate("/")
                                }}}
                        variant="h5"
                        >Notesy</Typography>
                    </div>
                  <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
                    <CircularProgress /> {/* Display a loading spinner */}
                </div>
        </div>
       
    }


    return <div style={{
        display : "flex",
        justifyContent : "space-between",
        padding : 5,
        backgroundColor: "black"
        }}>

        <div>
        <Typography 
        color={"white"}
        fontSize={25}
       onClick = {() => {
        if(userLogin){
            window.location.reload()}else{
                navigate("/")
            }}}
        variant="h5"
        >Notesy</Typography>
        </div>
        <div>
            
        {!userLogin ? (
          <>
              <div style={{display : "flex"}}>
            <div style={{marginRight : 10}}>
                <Button variant="contained"
                        onClick={() => {navigate("/signup")}}
                >Sign up</Button>
            </div>
            <div>
                <Button variant={"contained"}
                        onClick={() => {navigate("/signin")}}
                >Sign in</Button>
            </div>
        </div>
          </>
            ):(
                <>
                     <div>
                        <Button variant={"contained"}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setUserLogin({
                                        isUser:false
                                    })
                                    navigate("/")
                                }}
                        >Logout</Button>
                    </div>
                </>
            ) }
        </div>
       
      
      

        </div>
}