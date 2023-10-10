import { selector } from "recoil";
import { noteState } from "../atoms/note";


export const note = selector({
    key : 'noteValue',
    get : ({get}) => {
        const state = get(noteState);
            return state.note;
    },
})