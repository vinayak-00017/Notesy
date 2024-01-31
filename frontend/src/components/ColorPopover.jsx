import { SketchPicker } from "react-color";
import {Button, DialogContent,Popover} from "@mui/material"

export const OpenColorPopover = ({onColorChange,isOpen,handleClose,color}) => {

    const handleColorChange = (newColor) => {
            onColorChange(newColor.hex);
        }     
    

    return <Popover
    open={isOpen}
    anchorEl={null}
    onClose={handleClose}
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
        <Button onClick={handleClose}>Apply</Button>
    </DialogContent>
</Popover>
}