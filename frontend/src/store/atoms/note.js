import { atom } from "recoil";


export const noteState = atom({
    key: 'noteState',
    default : {
        note : ""
    }
})