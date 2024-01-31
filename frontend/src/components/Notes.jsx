import { TextField ,Card, Button} from "@mui/material"
import React,{useEffect, useState,useRef} from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import Render from "./Render"; 
import { useRecoilValue } from "recoil";
import { search } from "../store/selectors/search";
import { OpenColorPopover} from "./ColorPopover";


export const Notes = () => {

    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);
    const useSearch = useRecoilValue(search)
    const [color,setColor] = useState("#ffffff");
    const [isTextFieldFocused,setIsTextFieldFocused] = useState(false)
    const textFieldRef = useRef(null);
    const [isColorDialogOpen,setIsColorDialogOpen] = useState(false);

    const openColorDialog = () => {
        setIsColorDialogOpen(true);
    };
    
    const closeColorDialog = () => {
            setIsColorDialogOpen(false);
        };
    
    const handleColorChange = (color) =>{
            setColor(color)
        }
            

    useEffect(() => {
        if(!isTextFieldFocused && textFieldRef.current){
            textFieldRef.current.focus();
        }
    },[isTextFieldFocused])  
    
      
    const init = async () => {
        const response = await axios.get(`${BASE_URL}/user/notes`,{
            headers : {
                'authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        setNotes(response.data.notes)       
    }

    useEffect(() => {
        init();
    },[]);



    const handleClose = async() => {
        if(text != "" && text != null){
            const response = await axios.post(`${BASE_URL}/user/note`, {
                note : text,
                bgColor : color
            },{
                headers : {
                    'authorization' : `Bearer ${localStorage.getItem('token')}`        
                }})           
                setText("");
                setColor("#ffffff");
                setNotes([...notes,response.data.note])                
          }          
        }          
     

    const filteredNotes = (notes) =>{
        if(useSearch){
            return notes.filter(note => note.note.toLowerCase().includes(useSearch.toLowerCase()))
        }else{
            return notes
        }
    }

    return <div> 

    <div style={{
        display : "flex",
        justifyContent : "center"

    }}>
        <Card variant = {'outlined'} style = {{width : 600,padding: 10,marginTop: 10 , backgroundColor : `${color}50`}}>
        
            <div>
                 <TextField
                    label="Take a note..."
                    multiline
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    variant="outlined"
                    fullWidth
                    // onBlur={() => setIsTextFieldFocused(false)}
                    onFocus={() => setIsTextFieldFocused(true)} 
                 />
                {isTextFieldFocused && (
                    <div style={{display: "flex"  , justifyContent: "right" ,marginTop : 20 }}>
                    <div style={{display: "flex"  }}>
                        <Button style={{ textTransform : "none"}} 
                                onClick={openColorDialog}                                              
                        >Color
                        </Button>
                    </div>
                    {<OpenColorPopover onColorChange = {handleColorChange}
                                        isOpen = {isColorDialogOpen}
                                        handleClose = {closeColorDialog}
                                        color={color}
                    />}
                    <div style={{display: "flex" }}>
                        <Button style={{ textTransform : "none"}}
                                onClick={handleClose}
                        >Close
                        </Button>
                    </div>           
                </div> 
                )}                   
                    
            </div>                 
        </Card>      
    </div>

    <div style={{display: "flex", flexWrap: "wrap",justifyContent : "center"}}>
    {filteredNotes(notes).map(note => {
        return <Render note = {note} setNotes ={setNotes}  key={note._id} />
    })}
    </div>
   
</div>
}
