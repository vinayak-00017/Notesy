import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

import {
    Card,
    Popover,
    Typography,
    Button,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
  } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useRecoilValue } from "recoil";



export default function Render({note,setNotes}){
    const [isEditing, setIsEditing] = useState(false)
    const [editedText,setEditedText] = useState(note.note)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [color,setColor] = useState(note.bgColor);
    const [isColorDialogOpen,setIsColorDialogOpen] = useState(false);
    const userLoading = useRecoilValue(isUserLoading)

    if(userLoading){
        return  <div style={{
            display : "flex",
            justifyContent : "space-between",
            padding : 50
            }}>
        
          <div style={{ display: "flex", justifyContent: "center", padding: 5 }}>
            <CircularProgress /> {/* Display a loading spinner */}
        </div>
</div>
    }


    const openColorDialog = (event) => {
        setIsColorDialogOpen(true);
    };
      
      const closeColorDialog = () => {
        setIsColorDialogOpen(false);
    };
    
    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    }  

    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditDialogOpen(true);
    };


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

    
    const handleSaveClick = async() => {
        setIsEditing(false);
        setIsEditDialogOpen(false);

        if(note.note != editedText || note.bgColor != color){
            const response = axios.put(`${BASE_URL}/user/note/${note._id}`, {
                note: editedText,
                bgColor : color
            },{                      
                headers : {
                    'authorization' : `Bearer ${localStorage.getItem('token')}`
                }})
            if(response){
                note.note = editedText;
            }
        }
    };

    const handleCancelClick = () => {
        // Cancel editing and revert the text
        setEditedText(note.note);
        setIsEditing(false);
        setIsEditDialogOpen(false);
    };

    const handleDelete = async() => {
        const response = await axios.delete(`${BASE_URL}/user/delete/${note._id}`, {
                        
            headers : {
                'authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        setNotes((notes) =>
        notes.filter((item) => item._id !== note._id)
      );
      setIsEditing(false);
      setIsEditDialogOpen(false); 
    }


    return  <div style={{display: "flex"}}>
        
             <Card style={{
            margin: 10,
            marginTop : 50,
            minWidth: 200,
            maxWidth: 300,
            minHeight: 20,
            padding: 10,
            backgroundColor : `${color}50`,
            cursor: "pointer"
            
        }}
        onClick = {handleEditClick}
        >
            <CardContent>
                <p
                style={{
                    wordBreak: "break-all",
                    whiteSpace: "normal",
                    fontFamily: "scribble",
                    fontWeight : 600
                    }}
                >
                    {note.note}
                </p>
                            
                
            </CardContent>     
        </Card>    
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} style={{
            backgroundColor : "#00000050",
            }}>
        <DialogTitle style={{ width : 500, 
            backgroundColor : `${color}50`
            }}>Edit Note</DialogTitle>
        <DialogContent style={{backgroundColor : `${color}50`}}>
          <TextField
            multiline
            fullWidth
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{backgroundColor : `${color}50`}}>
        <div style={{display: "flex" , justifyContent : "right" }}>
                <Button style={{ textTransform : "none"}}
                        onClick={handleDelete}                    
                        >Delete
                        </Button>                        
                 </div>
                 <div style={{display: "flex" ,justifyContent : "right"  }}>
                        <Button style={{ textTransform : "none"}} 
                                onClick={openColorDialog}                                              
                        >Color
                        </Button>
                    </div>
                    {openColorPopover()}
        <div style={{display: "flex" , justifyContent : "right" }}>
                <Button style={{ textTransform : "none"}}
                        onClick={handleCancelClick}                    
                        >Cancel
                        </Button>                        
                 </div>
        <div style={{display: "flex" , justifyContent : "right" }}>
                <Button style={{ textTransform : "none"}}
                        onClick={handleSaveClick}                   
                        >Save
                        </Button>                        
                 </div>
        </DialogActions>
      </Dialog>   
    </div>
}