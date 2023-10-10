import { TextField, Typography ,Card, Button, Dialog, DialogTitle, DialogContent, DialogActions,Popover, CardContent, makeStyles} from "@mui/material"
import { alignProperty } from "@mui/material/styles/cssUtils"
import React,{useEffect, useState,useRef} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { noteState } from "../store/atoms/note";
import axios from "axios";
import { BASE_URL } from "../config";
import { note } from "../store/selectors/note";
import { SketchPicker } from "react-color";
import Render from "./Render"; 


export const Notes = () => {

    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [color,setColor] = useState("#ffffff");
    const [isColorDialogOpen,setIsColorDialogOpen] = useState(false);
    const [isTextFieldFocused,setIsTextFieldFocused] = useState(false)
    const textFieldRef = useRef(null);

    useEffect(() => {
        if(!isTextFieldFocused && textFieldRef.current){
            textFieldRef.current.focus();
        }
    },[isTextFieldFocused])

    const openColorDialog = (event) => {
        setIsColorDialogOpen(true);
    };
      
      const closeColorDialog = () => {
        setIsColorDialogOpen(false);
    };
    
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    }  

    const openColorPopover = () => {
        return <Popover
        open={isColorDialogOpen}
        anchorEl={null}
        onClose={closeColorDialog}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        >
        <DialogContent>
            <SketchPicker
            color={color}
            onChange={handleColorChange}
            />
            <Button onClick={closeColorDialog}>Apply</Button>
        </DialogContent>
    </Popover>

    }
      
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


    const handleTextChange = (event) => {
        setText(event.target.value);
    };

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
                    onChange={handleTextChange}
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
                    {openColorPopover()}
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
    {notes.map(note => {
        return <Render note = {note} setNotes ={setNotes}  key={note.id} />
    })}
    </div>
   
</div>
}
