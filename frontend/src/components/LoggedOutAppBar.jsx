import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default LoggedOutAppBar = () => {
    const navigate = useNavigate()

    return  <div>
    <div>  
   </div>
   <div style={{
     display : 'flex',
     justifyContent : 'right'
   }}>
     <Button
       style={{
         margin : 10
       }}
       variant='contained'
       onClick={()=>{
         navigate('/signin')
       }}>
         signin
     </Button>
     <Button
       style={{
         margin : 10,
         marginRight : 20
       }}
       variant='contained'
       onClick={()=>{
         navigate('/signup')
       }}>
         signup
     </Button>
   </div>
 
   </div>

}